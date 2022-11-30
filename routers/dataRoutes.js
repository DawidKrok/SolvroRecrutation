const router = require('express').Router()
const productServices = require('../services/productServices')
const dataServices = require('../services/dataServices')
const tokenServices = require('../services/tokenServices')

/** ==============
 *     PRODUCTS
 * =============== */
 
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
// router.post("/addProduct", productServices.addProduct)

 /** Deletes Product with given id 
  * req.body:
  * @id : id of Product to delete */
// router.post("/deleteProduct", tokenServices.authenticateToken, productServices.deleteProduct)


// =============| CART |============== //
/** Returns logged User's cart */
router.post("/getCart", tokenServices.authenticateToken, productServices.getCart)

/** Adds Product with given id to logged user's cart 
  * req.body:
  * @id : id of Product to add*/
router.post("/addToCart", tokenServices.authenticateToken, productServices.addToCart)

/** Adds Product with given id to logged user's cart 
  * req.body:
  * @id : id of Product to add*/
router.post("/setProductInCart", tokenServices.authenticateToken, productServices.setProductInCart)

/** Removes Product with given id from logged user's cart 
  * req.body:
  * @id : id of Product to remove */
router.post("/removeFromCart", tokenServices.authenticateToken, productServices.removeFromCart)

/** Returns User's cart share link*/
router.post("/getShareLink", tokenServices.authenticateToken, productServices.getShareLink)

/** Copies shared User's cart */
router.post("/applyShareLink", tokenServices.authenticateToken, productServices.applyShareLink)

/** ==========================
 *     DELIVERIES & PROMOS
 * =========================== */
 
 /** Returns all Deliveries documents from database */
router.post("/getDeliveries", dataServices.getDeliveries)

 /** Returns all Promos documents from database */
router.post("/getPromos", dataServices.getPromos)

module.exports = router