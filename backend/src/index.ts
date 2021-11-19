import Server from './server'

Server().then((server) => {
  server.listen({
    port: 4000
  }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})
