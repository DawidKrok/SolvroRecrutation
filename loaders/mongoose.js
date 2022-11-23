require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL

mongoose.connect(url, {
    // some settings for better mongoose performance
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) return console.log(err)
    console.log(`\x1b[42mConnected to Mongo database\x1b[0m`)
})