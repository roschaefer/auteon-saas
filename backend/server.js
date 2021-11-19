const { ApolloServer } = require('apollo-server');
const { gatewaySchema } = require('./gatewaySchema')
const { context } = require('./context')

const server = new ApolloServer({
    schema: gatewaySchema,
    context
});

module.exports = { server }
