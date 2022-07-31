const BaseRoute = require('./base/baseRoute')
const { join } = require('path')


class UtilRoutes extends BaseRoute {
    coverage() {
        return{
            path: '/coverage/index.html',
            method: 'GET',
            config: {
                auth: false
            },
            handler: {
                directory: {
                    path: join('../../coverage'),
                    redirectToSlash: true,
                    index: true
                }
            }
        }
    }
}
module.exports = UtilRoutes