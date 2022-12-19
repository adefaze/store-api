
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name must be provided']
    },
    price: {
        type: Number,
        require: [true, 'price must be provided']
    },
    feature: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'lidy', 'caressa', 'marcoss'],
            message: '{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model('Product', productSchema)