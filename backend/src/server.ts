import { ApolloServer } from 'apollo-server'
import gatewaySchema from './gatewaySchema'
import context from './context'

const server = async () => {
    const schema = await gatewaySchema()
    return new ApolloServer({
        schema,
        context
    });
}

export default server
