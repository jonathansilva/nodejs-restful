const boom = require('@hapi/boom')

const ensureAuth = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return Promise.reject(boom.forbidden('Access denied'))
    }

    next()
}

module.exports = ensureAuth
