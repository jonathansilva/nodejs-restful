const boom = require('@hapi/boom')
const { makeHandler } = require('../../handler')

const tryCatch = fn => {
    try {
        return Promise.resolve(fn())
    } catch (error) {
        return Promise.reject(error)
    }
}

const sendError = (res, error) => {
    const output = boom.boomify(error).output

    res.send(output.statusCode, output)
}

const wrapMiddleware = ( middleware, options = {} ) => {
    const handler = makeHandler(middleware, options)

    return (req, res) => {
        tryCatch(() => handler(req, res))
        .catch((error) => sendError(res, error))
    }
}

module.exports = wrapMiddleware
