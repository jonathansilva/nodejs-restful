const path = require('path')
const filter = require('filter-files')
const isDir = require('is-directory')
const { flatten } = require('lodash')
const isRouteFile = fileName => /((routes)|(route))\.js$/.test(fileName)

const routeFiles = dirName => {
    return filter.sync(dirName, (fp, dir, files, recurse) => {
        if (isRouteFile(fp)) {
            return true
        }
        return isDir.sync(path.join(dir, fp))
    }, true)
}

const loadRoutesByPath = dirName => {
    const routes = routeFiles(dirName).map(require)

    return flatten(routes)
}

module.exports = loadRoutesByPath
