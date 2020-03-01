const loadRoutesByPath = require('./load-routes-by-path')
const registerRoute = require('./register-route')

const registerRoutesByPath = (app, dirName) => {
    const routes = loadRoutesByPath(dirName)

    routes.forEach(route => registerRoute(app, route))
}

module.exports = registerRoutesByPath
