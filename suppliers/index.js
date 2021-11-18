const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs')
const { context } = require('./context')
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
        currentUser: (_parent, _args, { user }) => user
    },
};

const server = new ApolloServer({
    typeDefs: [Types, Query],
    resolvers,
    context
});

server.listen({
    port: 4001
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
