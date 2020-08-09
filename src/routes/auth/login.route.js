const boom = require('@hapi/boom')
const joi = require('@hapi/joi')
const authenticate = require('../../services/auth/login')

const schema = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().min(8).required()
})

const handler = async ({ payload, services }) => {
    const { db } = services

    try {
        const token = await authenticate(db, payload)

        return {
            status: 200,
            data: token
        }
    } catch(error) {
        //console.error(error)
        return Promise.reject(boom.badRequest('Incorrect user and password combination'))
    }
}

module.exports = {
    method: 'post',
    path: '/auth',
    useWrap: true,
    schema,
    handler
}
