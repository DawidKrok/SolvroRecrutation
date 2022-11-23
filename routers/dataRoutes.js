const router = require('express').Router()
const productServices = require('../services/productServices')
const tokenServices = require('../services/tokenServices')


//&&&&&&&&&&&&&| POST METHODS |&&&&&&&&&&&&&&
/** =============
 *     PRODUCTS
 * ============= */
 
 /** Returns all Products documents from database */
router.post("/get_all_products", productServices.getAllProducts)
 
 /** Returns Product with given id 
  * req.body:
  * @id : id of Product to return */
router.post("/get_product", productServices.getProduct)

/** Adds new Product with given name, and returns it
 * req.body:
 * @name : name of the new Product 
 * @price : price of the new Product */
router.post("/add_product", productServices.addProduct)

 /** Deletes Product with given id 
  * req.body:
  * @id : id of Product to delete */
router.post("/delete_product", tokenServices.authenticateToken, productServices.deleteProduct)


// =============| CART |============== //
 /** Adds Product with given id to logged user's cart 
  * req.body:
  * @id : id of Product to delete */
  router.post("/addToCart", tokenServices.authenticateToken, productServices.addToCart)


module.exports = router