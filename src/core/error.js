const boom = require('@hapi/boom')

const ensureBoom = error => {
    if (error.isJoi) {
        return boom.boomify(error, { statusCode: 400 })
    }

    return boom.isBoom(error) ? error : boom.boomify(error)
}

const parseError = error => {
    const err = ensureBoom(error)
    const { output } = err

    return {
        statusCode: output.statusCode,
        headers: output.headers,
        data: output.payload
    }
}

module.exports = { parseError }
