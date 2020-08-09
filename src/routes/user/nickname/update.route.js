const boom = require('@hapi/boom')
const joi = require('@hapi/joi')
const ensureAuth = require('../../../middlewares/token/ensure-auth')
const update = require('../../../services/user/nickname/update')

const schema = joi.object().keys({
    nickname: joi.string().required()
})

const handler = async ({ payload, services, authInfo }) => {
    const { nickname } = payload
    const { db } = services
    const { id } = authInfo

    try {
        await update(db, nickname, id)

        return {
            status: 200,
            data: 'Successfully updated'
        }
    } catch(error) {
        //console.error(error)
        return Promise.reject(boom.badRequest('Error updating, please try again'))
    }
}

module.exports = {
    method: 'put',
    path: '/user/nickname',
    useWrap: true,
    schema,
    handler: [ ensureAuth, handler ]
}
