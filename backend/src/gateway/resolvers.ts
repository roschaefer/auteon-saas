import { delegateToSchema } from '@graphql-tools/delegate';
import { GraphQLSchema, GraphQLResolveInfo } from 'graphql';

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
type Context = { user: { sub: string } }
type AddToShoppingCartArgs = {
    filter: { id: String },
    offers: unknown[],
}

export default ({ subschema }: {subschema: GraphQLSchema} ) => ({
    Query: {
        currentUser: (_parent: unknown, _args: unknown, context: Context, info: GraphQLResolveInfo) => {
            const { user: { sub } } = context
            return delegateToSchema({
                schema: subschema,
                operation: 'query',
                fieldName: 'getUser',
                args: { sub },
                context,
                info
            })
        },
        search: () => offers,
    },
    Mutation: {
        addToShoppingCart: (_parent: unknown, args: AddToShoppingCartArgs, context: Context, info: GraphQLResolveInfo) => {
            const { user } = context
            const { filter, offers } = args
            const set = {
                customer: user,
                offers,
            }
            return delegateToSchema({
                schema: subschema,
                operation: 'mutation',
                fieldName: 'updateShoppingCart',
                args: {
                    input: { filter, set }
                },
                context,
                info
            })
        }
    }
})
