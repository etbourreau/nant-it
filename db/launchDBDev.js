const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const config = require('../config.json').db

server.use(middlewares)
server.use(router)
server.listen(config.LOCAL_PORT, () => {
    console.log("Nant'IT DB Dev started...")
})