/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, require, CONFIG, global) => {
    "use strict";
    module.exports = (app) => {
        global.apiServer.getRoutes((error, apis) => {
            if(error) {
                logger.error('Unable to get APIs from API Server');
            } else {
                apis.forEach((api) => {
                    app[api.method.toLowerCase()](api.url, require(CONFIG.customApiHandlerDirectory + api.name));
                });
                logger.info('Route Mapping done!')
            }
        });
    };
})(module, require, CONFIG, global);