const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const encode = data => {
    return new Promise((resolve, reject) => {
        jwt.sign(data, JWT_SECRET, { expiresIn: '15d' }, (error, token) => {
            if (error) {
                reject(error)
                return
            }
            resolve(token)
        })
    })
}

module.exports = encode
