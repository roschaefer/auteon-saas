import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import gateway from './gateway'
import context from './context'
import permissions from './permissions'

const server = async () => {
    const schema = await gateway.Schema()
    return new ApolloServer({
        schema: applyMiddleware(schema, permissions),
        context
    });
}

export default server
