# Installation

Run:
```
docker-compose up
```

Wait for the Dgraph service to get up and running. Then:
```
curl -X POST localhost:4002/admin/schema --data-binary '@suppliers/types.graphql'
```

Create superschema:
```
rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql
```

Run the gateway:
```
node index.js
```
