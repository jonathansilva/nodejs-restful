const db = require('../services/database')
const { parseError } = require('./error')

const parsePayload = req => {
    return { ...req.params, ...req.body }
}

const parseToken = req => {
    return { ...req.tokenData }
}

const makeHandler = ( handler, options = {} ) => {
    return async (req, res) => {
        try {
            let payload = parsePayload(req)

            const { schema } = options

            if (schema != undefined) {
                payload = await schema.validateAsync(payload, { abortEarly: false })
            }

            const services = { db }

            const authInfo = parseToken(req)

            const { status, data } = await handler({ payload, services, authInfo }, { req, res })

            res.json(status, { data })
        } catch (error) {
            console.error(error)
            const errorResponse = parseError(error)
            res.json(errorResponse.statusCode, errorResponse)
        }
    }
}

module.exports = { makeHandler }
