const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const decode = token => {
    const [, hash] = token.split(' ')

    return new Promise((resolve, reject) => {
        jwt.verify(hash, JWT_SECRET, (error, decoded) => {
            if (error) {
                reject(error)
                return
            }
            resolve(decoded)
        })
    })
}

module.exports = decode
