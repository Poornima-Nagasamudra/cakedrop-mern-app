const express = require('express')
const mongoose = require('mongoose')
const imageFormat = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/

const Schema =  mongoose.Schema

const productSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image : {
        type: String,
        required: true,
    },
    category: {
        type: String
    },
    available : {
        type : Boolean,
        default: true
    }

}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product