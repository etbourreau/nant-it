const config = require('../config.json').web
const express = require('express')
const app = express()

app.use(express.static('dist'))
app.listen(config.PORT, () => {
    console.log("Nant'IT WebServer started...")
})