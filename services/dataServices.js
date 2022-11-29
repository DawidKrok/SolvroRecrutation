const Delivery = require('../db/schemes').Delivery
const Promo = require('../db/schemes').Promo


/** @Sends : all deliveries */
getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find().lean()
        res.status(202).send(deliveries)
        
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Sends : all promos */
getPromos = async (req, res) => {
    try {
        const promos = await Promo.find().lean()
        res.status(202).send(promos)
        
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

module.exports = {
    getDeliveries,
    getPromos,
}