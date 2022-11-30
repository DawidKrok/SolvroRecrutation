const router = require('express').Router()
const tokenServices = require("../services/tokenServices")

//&&&&&&&&&&&&&| GET METHODS |&&&&&&&&&&&&&&
router.get("/", tokenServices.checkLogged, (req, res) => {
    res.render("index", {logged: req.logged})
})

router.get("/login", tokenServices.checkLogged, (req, res) => {
    if(req.logged)
        return res.redirect("/")

    res.render("login")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/cart", tokenServices.checkLogged, (req, res) => {
    if(!req.logged)
        return res.redirect("login")

    res.render("cart")
})

router.get("/share", tokenServices.checkLogged, (req, res) => {
    if(!req.logged)
        return res.redirect("login")

    res.render("share")
})


module.exports = router
