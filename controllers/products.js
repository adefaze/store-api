
const Product = require('../models/products')


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ company: 'liddy' })
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    // featured item

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    // find company

    if (company) {
        queryObject.company = company
    }

    // query item

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    // console.log(queryObject);

    let results = Product.find(queryObject)


    // sort items

    if (sort) {
        const sortList = sort.split(',').join(' ')
        results = results.sort(sortList)
    }
    else {
        results = results.sort('createdAt')
    }

    // select item

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        results = results.select(fieldsList)
    }

    // limit and pagination

    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page - 1) * limit

    results = results.skip(skip).limit(limit)

    // numeric filters

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,
            (match) => `-${operatorMap[match]}-`)

        const options = ['price, ratings']
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        });

    }

    const products = await results
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}