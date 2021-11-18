
Start DGraph:
```
docker run -it -p 8080:8080 dgraph/standalone:master
```

Wait for the database to get up and running. Then:
```
curl -X POST localhost:8080/admin/schema --data-binary '@dgraph/schema.graphql'
```

Create superschema:
```
rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql
```

Run the gateway:
```
node index.js
```
