# Installation

Run:
```
docker-compose up
```

Wait for the Dgraph service to get up and running. Then:
```
curl -X POST localhost:4002/admin/schema --data-binary '@backend/types.graphql'
```

## Usage

Open keycloak at http://localhost:5000. Default admin username and password is
`admin`.

Follow this tutorial to set up openid: https://developers.redhat.com/blog/2020/01/29/api-login-and-jwt-token-generation-using-keycloak

Then run this command:
```bash
curl -L -X POST 'http://localhost:5000/auth/realms/master/protocol/openid-connect/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'scope=openid' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=<client-id>' \
--data-urlencode 'username=<username>' \
--data-urlencode 'password=<password>'
```

## Apolllo Federation

Create superschema:
```
rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql
```

Run the gateway:
```
node index.js
```
