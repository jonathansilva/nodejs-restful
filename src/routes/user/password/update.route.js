const boom = require('@hapi/boom')
const joi = require('@hapi/joi')
const ensureAuth = require('../../../middlewares/token/ensure-auth')
const update = require('../../../services/user/password/update')

const schema = joi.object().keys({
    password: joi.string().required(),
    repeat_password: joi.any().valid(joi.ref('password')).required()
})

const handler = async ({ payload, services, authInfo }) => {
    const { password } = payload
    const { db } = services
    const { id } = authInfo

    try {
        await update(db, password, id)

        return {
            status: 200,
            data: 'Successfully updated'
        }
    } catch(error) {
        console.error(error)
        return Promise.reject(boom.badRequest('Error updating, please try again'))
    }
}

module.exports = {
    method: 'put',
    path: '/user/password',
    useWrap: true,
    schema,
    handler: [ ensureAuth, handler ]
}
