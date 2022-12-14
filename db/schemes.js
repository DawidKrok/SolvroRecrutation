const mongoose = require("mongoose")

// Schemas for unification of documents inside database
const deliverySchema = new mongoose.Schema({    
    name: String,
    price: Number,
}, {
    versionKey: false
})
const Delivery = new mongoose.model("Delivery", deliverySchema)


const promoSchema = new mongoose.Schema({    
    name: String,
    discount: String,
}, {
    versionKey: false
})
const Promo = new mongoose.model("Promo", promoSchema)


const productSchema = new mongoose.Schema({    
    name: String,
    price: Number,
}, {
    versionKey: false
})
const Product = new mongoose.model("Product", productSchema)


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
        product: {
            type: mongoose.ObjectId,
            ref: "Product",
        },
        quantity: Number,
        _id: false
    }]
}, {
    versionKey: false
})
const User = new mongoose.model("User", userSchema)


const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    }
}, {
    versionKey: false
})
const RefreshToken = new mongoose.model("RefreshToken", refreshTokenSchema)


module.exports = {
    Product,
    User,
    RefreshToken,
    Delivery,
    Promo
} 