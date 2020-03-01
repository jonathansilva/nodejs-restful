const bcrypt = require('bcrypt')
const encode = require('../auth/jwt/encode')

const verifyCredentials = async (db, email, phone) => {
    const result = await db.select('email', 'phone').from('user')
    .Where('email', email)
    .orWhere('phone', phone).first()

    if (result) {
        return Promise.reject(new Error('E-mail or phone, there are already'))
    }
}

const generateHash = async password => {
    const hash = await bcrypt.hash(password, 10)

    return hash
}

const insert = async (db, data) => {
    const id = await db.insert(data).from('user')

    return id
}

const create = async (db, data) => {
    const { email, phone, password } = data

    await verifyCredentials(db, email, phone)

    const hash = await generateHash(password)
    data.password = hash

    const [ id ] = await insert(db, data)

    return await encode({ id })
}

module.exports = create
