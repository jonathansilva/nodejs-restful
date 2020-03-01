const cors = require('./cors')
const restify = require('restify')
const app = restify.createServer()

const token = require('../../middlewares/token/token-assert')
const register = require('./routes/register-routes-by-path')

const dirName = __dirname + '/../../routes'

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
register(app, dirName)

module.exports = app
