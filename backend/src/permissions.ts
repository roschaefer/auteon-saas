import { shield, rule, allow, deny } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  return ctx.user !== null
})

export default shield({
  Query: {
    search: isAuthenticated,
    currentUser: allow,
    "*": deny
  },
  Mutation: {
    addToShoppingCart: isAuthenticated,
    "*": deny
  }
}, {
  fallbackRule: allow
})
