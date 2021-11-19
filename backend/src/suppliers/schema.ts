import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFileSync } from 'fs'

// we must convert the file Buffer to a UTF-8 string
const Types = readFileSync('./types.graphql').toString('utf-8')

const Query = gql`
type Query {
    search(query: String!): [Offer!]!
    currentUser: User
}
`;

const manufacturer = {
    id: 42,
    name: 'Bosch'
}

const productA = {
    id: 12,
    articleNumber: '1a',
    name: 'Bremsen',
    manufacturer,
}

const productB = {
    id: 13,
    articleNumber: '1b',
    name: 'Zündkerzen',
    manufacturer,
}

const offers = [
    {id: 1, purchasePrice: 23, product: productA },
    {id: 2, purchasePrice: 24, product: productB },
    {id: 3, purchasePrice: 25, product: productA },
]

const resolvers = {
    Query: {
        search: () => offers,
        currentUser: (_parent: unknown, _args: unknown, { user }: { user: unknown }) => user
    },
};

const schema = makeExecutableSchema({
    typeDefs: [Types, Query], resolvers
})

export default schema
