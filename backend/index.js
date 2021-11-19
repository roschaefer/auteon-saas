const { server } = require('./server')

server.listen({
    port: 4001
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
