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
        const user = await User.findById(req.user._id)
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

        const user = await User.findById(req.user._id)

        //=======| ADD OR INCREMENT |=======
        prodIndex = user.cart.findIndex(elem => elem.productId == req.body.id)
        
        // if there's already a Product with given Id, increment its quantity
        if(prodIndex >= 0)
            user.cart[prodIndex].quantity++
        else // else - add product to User's cart
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
        
        const user = await User.findById(req.user._id)
        //=======| REMOVE OR DECREMENT |=======
        
        prodIndex = user.cart.findIndex(elem => elem.productId == req.body.id)
        
        // if there's no Product with given Id, return 404
        if(prodIndex == -1) return res.sendStatus(404)
        
        
        user.cart[prodIndex].quantity--
        
        // if quantinty reached 0, remove Product from cart
        if(user.cart[prodIndex].quantity <= 0) 
            user.cart.splice(prodIndex, 1)

        await user.save()

        res.status(202).send(JSON.stringify(user.cart))
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