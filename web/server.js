const config = require('../config.json').web
const express = require('express')
const app = express()

app.use(express.static('dist'))
app.listen(config.PRODUCTION_PORT, () => console.log('listening...'))