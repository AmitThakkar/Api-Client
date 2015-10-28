/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, require, CONFIG, global) => {
    "use strict";
    module.exports = (app) => {
        global.apiServer.getRoutes((apis) => {
            apis.forEach((api) => {
                app[api.method.toLowerCase()](api.url, require(CONFIG.customApiHandlerDirectory + api.name));
            });
            logger.info('Route Mapping done!')
        });
    };
})(module, require, CONFIG, global);