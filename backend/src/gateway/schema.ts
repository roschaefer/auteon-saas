import { stitchSchemas } from '@graphql-tools/stitch'
import dgraph from './dgraph'
import { gql } from 'apollo-server';
import resolvers from './resolvers'

const Query = gql`
type Query {
    currentUser: User
    search(query: String!): [Offer!]!
}
`;


const gatewaySchema = async () => {
    const schema = await dgraph.Schema()
    return stitchSchemas({
        subschemas: [
            schema,
        ],
        typeDefs: [Query],
        resolvers,
    })
}

export default gatewaySchema
