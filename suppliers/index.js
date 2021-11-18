const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Offer @key(fields: "id") {
        id: ID!
        purchasePrice: Int
        product: Product
        supplier: Supplier
    }

    extend type Product @key(fields: "id") {
        id: ID! @external
    }

    extend type Supplier @key(fields: "id") {
        id: ID! @external
    }

type Query {
    search(query: String!): [Offer!]!
}
`;

const offers = [
    {id: 1 },
    {id: 2 },
    {id: 3 },
]

const resolvers = {
  Query: {
    search: () => offers
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server.listen({
    port: 4001
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
