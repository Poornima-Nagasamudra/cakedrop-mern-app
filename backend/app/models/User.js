const express = require('express')
const mongoose = require('mongoose')
const isEmail = require( 'validator/lib/isEmail');
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const Schema = mongoose.Schema
const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required : true,
        unique: true,
        validate: {
            validator : function(value){
                return isEmail(value)
            },
            message : function(){
                return 'invalid email or password'
            }
        }
    },
    password : {
        type : String,
        required: true,
        minlength: 8,
        maxlength: 200,
        // validate : {
        //     validator : function(value){
        //         return passwordFormat.test(value)
        //     }, 
        //     message : function(){
        //         return 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'
        //     }
        // }
    },
    role: {
        type: String,
        enum: ['admin','user', 'customer'],
        default: 'customer'
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User