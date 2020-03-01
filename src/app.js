require('dotenv').config()

const server = require('./core/server')

const { SERVER_PORT } = process.env

server.listen(SERVER_PORT || 3000)
