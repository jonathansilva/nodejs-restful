const bcrypt = require('bcrypt')
const encode = require('./jwt/encode')

const verifyEmail = async (db, email) => {
    const result = await db.select('id', 'email', 'password').from('user').where('email', email).first()

    if (!result) {
        return Promise.reject(new Error('Email not found'))
    }
    return result
}

const verifyPassword = async (password, hash) => {
    const isValid = await bcrypt.compare(password, hash)

    if (!isValid) {
        return Promise.reject(new Error('Invalid password'))
    }
}

const authenticate = async (db, data) => {
    const { email, password } = data
    const result = await verifyEmail(db, email)

    const { id } = result
    const _password = result.password

    await verifyPassword(password, _password)

    return await encode({ id })
}

module.exports = authenticate
