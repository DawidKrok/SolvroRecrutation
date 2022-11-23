const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../db/schemes').User
const RefreshToken = require('../db/schemes').RefreshToken
const tokenServices = require("./tokenServices")

// &&&&&&&&&&&&&&&& | LOGIN AND REGISTRATION | &&&&&&&&&&&&&&&
// Checks if data passed is compatible with one of users in database
authenticateUser = async (req, res, next) => {
    try {
        if (!req.body.email) return res.sendStatus(400)

        const user = await User.findOne({ email: req.body.email }).lean()

        // Check if user was found
        if (!user) return res.status(404).send()

        // Check if password matches
        if (!await bcryptjs.compare(req.body.password, user.password))
            return res.status(401).send()

        // user for login
        req.user = user
        next()
    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}

login = async (req, res) => {
    try {
        // check if user is already logged
        if(await tokenServices.checkRefreshToken(req.cookies.refreshToken))   
            return res.sendStatus(406)

        // Return token to store and use for further access
        const accessToken = tokenServices.generateAccessToken(req.user)

        const refreshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN_SECRET)

        // save new Refresh Token
        const saveToken = new RefreshToken({ token: refreshToken })
        await saveToken.save()

        // Store Refresh Token in client's cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000  // 15 min
        })

        // Send Access Token to client
        res.status(202).json(accessToken)
    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}

// check data and add new user to database with given email and password
register = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) return res.sendStatus(401)
        // Check if send data is valid
        if (!validateRegistration(req.body)) return res.sendStatus(403)

        //TODO: verify mail
        const user = await User.findOne({ email: req.body.email })

        // If there's already user with same mail registered
        if (user) return res.sendStatus(404)

        // Hashing password
        const hashedPass = await bcryptjs.hash(req.body.password, 10)

        const newUser = new User({
            email: req.body.email,
            password: hashedPass,
            cart: []
        })
        await newUser.save()

        //user for login
        req.user = newUser.toJSON()

        next()

    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}

/** Checks if data for registration is valid
 * @data : data to validate */
validateRegistration = data => {
    // regex for email Test
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!re.test(data.email.toLowerCase())) return false

    if (data.password.length < 7) return false

    return true
}


// &&&&&&&&&&&&&&&& | EXPORTS | &&&&&&&&&&&&&&&

module.exports = {
    authenticateUser,
    login,
    register
}