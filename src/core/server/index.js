const cors = require('./cors')
const restify = require('restify')
const app = restify.createServer()
const path = require('path')
const token = require('../../middlewares/token/token-assert')
const register = require('./routes/register-routes-by-path')

// CORS
app.pre(cors.preflight)
app.use(cors.actual)

// Restify
app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser())

// Token assert
app.use(token)

// Load all routes
register(app, path.join(__dirname, '/../../routes'))

module.exports = app
