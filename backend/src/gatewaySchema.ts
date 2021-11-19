import { stitchSchemas } from '@graphql-tools/stitch'
import suppliers from './suppliers/'
import dgraph from './dgraph'

const gatewaySchema = async () => {
    const schema = await dgraph.schema()
    return stitchSchemas({
        subschemas: [
            schema,
            suppliers.schema
        ]
    })
}

export default gatewaySchema
