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

export default {
    Query: {
        currentUser: (_parent: unknown, _args: unknown, { user }: { user: unknown }) => user,
        search: () => offers,
    }
}
