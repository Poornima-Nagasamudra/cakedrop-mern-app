const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User' , //This "User" model is what `.populate('user')` refers to
        required: true
    }, 
    items : [{
        product : {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity  : {
            type: Number,
            required: true
        }
    }],
    totalAmount : {
        type: Number,
        required: true
    },
    status : {
        type: String,
        enum: ['pending', 'confirmed', 'delivered'],
        default : 'pending'
    }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order