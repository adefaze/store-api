
const getAllProductsStatic = async (req, res) => {
    throw new Error('testing async errors')
    res.status(200).json({ msg: 'product testing route' })
}

const getAllProduct = async (req, res) => {
    res.status(200).json({ msg: 'testing route' })
}

module.exports = {
    getAllProduct,
    getAllProductsStatic
}