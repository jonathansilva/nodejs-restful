const middleware = require('restify-cors-middleware')

const cors = middleware({
    preflightMaxAge: 5, // Opcional
    origins: ['*'],
    allowHeaders: ['Origin, X-Requested-With, Content-Type, Accept, x-access-token'],
    exposeHeaders: ['GET, POST, PUT, PATCH, DELETE, OPTIONS']
})

module.exports = cors
