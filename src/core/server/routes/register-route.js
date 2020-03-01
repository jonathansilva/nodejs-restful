const { pick, isArray } = require('lodash')
const wrapMiddleware = require('./wrap-middleware')

const toArray = value => isArray(value) ? value : [value]

const applyWrap = ( handlers, schema ) => {
    const last = handlers.pop()

    handlers.push(wrapMiddleware(last, { schema }))

    return handlers
}

const getHandlers = route => {
    const { useWrap, schema } = route

    let handlers = toArray(route.handler)

    if (useWrap) {
        handlers = applyWrap(handlers, schema)
    }
    return handlers
}

const registerRoute = (app, route) => {
    const { method } = route
    const opts = pick(route, 'path')
    const handlers = getHandlers(route)

    app[method](opts, handlers)
}

module.exports = registerRoute
