import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import gatewaySchema from './gatewaySchema'
import context from './context'
import permissions from './permissions'

const server = async () => {
    const schema = await gatewaySchema()
    return new ApolloServer({
        schema: applyMiddleware(schema, permissions),
        context
    });
}

export default server
