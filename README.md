# Installation

Run:
```
docker-compose up --build
```

Wait for the Dgraph service to get up and running. Then:
```
curl -X POST localhost:4001/admin/schema --data-binary '@backend/src/gateway/dgraph/types.graphql'
```

## Keycloak

Open keycloak at http://localhost:5000. Default admin username and password is
`admin`.

Follow this tutorial to set up openid: https://developers.redhat.com/blog/2020/01/29/api-login-and-jwt-token-generation-using-keycloak

Get the public key to verify JWTs in the backend:
`Realm Settings` >> `Keys` >> `Public keys`

## Workaround runtime dependencies

The backend has a runtime dependency on Dgraph at the moment, so Dgraph must
expose a valid schema before the backend starts.

You can start individual docker services after you populated the schema with the
`curl` command from above:
```
docker-compose up dgraph keycloak
```

Then start the backend manually:
```
cd backend
npm install
npm run build
DGRAPH_ENDPOINT=http://localhost:4001/graphql JWT_PUBLIC_KEY="<PUBLIC_KEY_FROM_KEYCLOAK>" yarn run start
```

## Usage

To get a valid JWT token that you can use as a HTTP Bearer token, run the
following command:

```bash
curl -L -X POST 'http://localhost:5000/auth/realms/master/protocol/openid-connect/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'scope=openid' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=<client-id>' \
--data-urlencode 'username=<username>' \
--data-urlencode 'password=<password>'
```
