const router = require('express').Router()
const productServices = require('../services/productServices')
const tokenServices = require('../services/tokenServices')


//&&&&&&&&&&&&&| POST METHODS |&&&&&&&&&&&&&&
/** =============
 *     PRODUCTS
 * ============= */
 
 /** Returns all Products documents from database */
router.post("/getAllProducts", productServices.getAllProducts)
 
 /** Returns Product with given id 
  * req.body:
  * @id : id of Product to return */
router.post("/getProduct", productServices.getProduct)

/** Adds new Product with given name, and returns it
 * req.body:
 * @name : name of the new Product 
 * @price : price of the new Product */
router.post("/addProduct", productServices.addProduct)

 /** Deletes Product with given id 
  * req.body:
  * @id : id of Product to delete */
router.post("/deleteProduct", tokenServices.authenticateToken, productServices.deleteProduct)


// =============| CART |============== //
/** Returns logged User's cart */
router.post("/getCart", tokenServices.authenticateToken, productServices.getCart)

/** Adds Product with given id to logged user's cart 
  * req.body:
  * @id : id of Product to add*/
router.post("/addToCart", tokenServices.authenticateToken, productServices.addToCart)

/** Removes Product with given id from logged user's cart 
  * req.body:
  * @id : id of Product to remove */
router.post("/removeFromCart", tokenServices.authenticateToken, productServices.removeFromCart)

module.exports = router