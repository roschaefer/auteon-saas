import { stitchSchemas } from '@graphql-tools/stitch'
import dgraph from './dgraph'
import { gql } from 'apollo-server';
import Resolvers from './resolvers'

const Query = gql`
type Query {
    currentUser: User
    search(query: String!): [Offer!]!
}
type Mutation {
    addToShoppingCart(filter: ShoppingCartFilter!, offers: [OfferRef]): UpdateShoppingCartPayload
}
`;


const gatewaySchema = async () => {
    const schema = await dgraph.Schema()
    return stitchSchemas({
        subschemas: [
            schema,
        ],
        typeDefs: [Query],
        resolvers: Resolvers( { subschema: schema }),
    })
}

export default gatewaySchema
