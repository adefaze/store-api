const express =  require('express')
const router = express.Router()

const {getAllProduct,getAllProductsStatic} = require('../controllers/products')

router.route('/').get(getAllProduct)
router.route('/static').get(getAllProductsStatic)

module.exports = router