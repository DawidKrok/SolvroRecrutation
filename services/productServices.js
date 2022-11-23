const User = require('../db/schemes').User
const Product = require('../db/schemes').Product


// &&&&&&&&&&&&&&&& | PRODUCT | &&&&&&&&&&&&&&&

/** @Sends : all saved Products corresponding to given @city from database */
getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().lean()
        res.status(202).send(products)
        
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Sends : Product from database of given @id */
getProduct = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)

        res.status(202).send(JSON.stringify(
            await Product.findById(req.body.id).lean()
        ))

    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Adds : new Product to database */
addProduct = async (req, res) => {
    try {
        if(!req.body.name || !req.body.price)  
            return res.sendStatus(400)
            
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
        })
        await product.save()

        console.log(`Added product ${product}`)

        res.status(202).send(JSON.stringify(product))

    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Deletes : Product from database */
deleteProduct = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(403)

        Product.deleteOne({_id: req.body.id}, err => {
            if(err) return res.sendStatus(400)
            
            res.sendStatus(202)
        })

    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

// &&&&&&&&&&&&&&&& | CART | &&&&&&&&&&&&&&&
/** @Gets : User's cart array */
getCart = async (req, res) => {
    try {     
        // req.user contains only user info encoded into token, so it's good only for retrieving credentials
        const user = await User.findOne({ email: req.user.email })  
        res.status(202).send(JSON.stringify(user.cart))

    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Adds : new Product to User's cart */
addToCart = async (req, res) => {
    try {
        if(!req.body.id)  
            return res.sendStatus(400)
            
        if(!await Product.findById(req.body.id))
            return res.status(404)

        const user = await User.findOne({ email: req.user.email })

        user.cart.push({
            productId: req.body.id,
            quantity: 1,
        })

        await user.save()

        res.status(202).send(JSON.stringify(user.cart))

    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Deletes : Product from User's cart */
removeFromCart = async (req, res) => {
    try {
        if(!req.body.id)  
            return res.sendStatus(400)
            
        res.status(202).send(JSON.stringify(req.user.cart))

    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    getCart,
    addToCart,
    removeFromCart,
}