require('dotenv').config()

const connectDB = require('./db/connect')

const product = require('./models/products')
const productsData = require('./products.json')



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await product.deleteMany()
        await product.create(productsData)
        console.log('success')
        process.exit(0)
        

    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}

start()