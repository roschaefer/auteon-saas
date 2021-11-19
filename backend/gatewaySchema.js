const { stitchSchemas } = require('@graphql-tools/stitch')
const { schema: supplierSchema  } = require('./suppliers/')

const gatewaySchema = stitchSchemas({
    subschemas: [
        supplierSchema
    ]
})

module.exports = { gatewaySchema }
