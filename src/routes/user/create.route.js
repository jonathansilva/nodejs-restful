const boom = require('@hapi/boom')
const joi = require('@hapi/joi')
const create = require('../../services/user/create')

const schema = joi.object().keys({
    name: joi.string().required(),
    nickname: joi.string(),
    phone: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().min(8).required()
})

const handler = async ({ payload, services }) => {
    const { db } = services

    try {
        const token = await create(db, payload)

        return {
            status: 200,
            data: token
        }
    } catch(error) {
        //console.error(error)
        return Promise.reject(boom.badRequest('Incorrect phone and email combination'))
    }
}

module.exports = {
    method: 'post',
    path: '/user',
    useWrap: true,
    schema,
    handler
}
