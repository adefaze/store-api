require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const connectDB = require('./db/connect')


const productRouter = require('./routes/products')


//middleware
app.use(express.json())

// route

app.get('/', (req, res) => {
    res.status(200).send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>')
})

// product route

app.use('/api/v1/products', productRouter)



app.use(notFound)
app.use(errorHandler)



//start DB

port = 5000 || process.env.PORT

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
         app.listen(port, console.log(`server is listening to ${port}...`))
    } catch (error) {
        console.log(error)
        
    }
   
}

start()