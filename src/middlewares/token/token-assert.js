const boom = require('@hapi/boom')
const decode = require('../../services/auth/jwt/decode')

const tokenAssert = async (req, res, next) => {
    const token = req.headers.authorization

    try {
        const tokenData = token ? await decode(token) : {}

        // Inject the decoded token into the req
        Object.defineProperty(req, 'tokenData', {
            get: () => tokenData
        })

        next()
    } catch (error) {
        //console.error(error)
        return Promise.reject(boom.badRequest('Invalid authentication'))
    }
}

module.exports = tokenAssert
