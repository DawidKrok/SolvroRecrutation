const mongoose = require("mongoose")

// Schemas for unification of documents inside database
const productSchema = new mongoose.Schema({    
    name: String,
    price: Number,
}, {
    versionKey: false
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    cart: [{
        productId: mongoose.ObjectId,
        quantity: Number
    }]
}, {
    versionKey: false
})

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    }
}, {
    versionKey: false
})

// models with declared Schema
const Product = new mongoose.model("Product", productSchema)
const User = new mongoose.model("User", userSchema)
const RefreshToken = new mongoose.model("RefreshToken", refreshTokenSchema)


module.exports = {
    Product,
    User,
    RefreshToken,
} 