/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, require, CONFIG, global) => {
    "use strict";
    const fs = require('fs');
    module.exports = (app) => {
        global.getRoutes((apis) => {
            apis.forEach((api) => {
                app[api.method.toLowerCase()](api.url, require(process.cwd() + '/' + api.name));
            });
            logger.info('Route Mapping done!')
        });
    };
})(module, require, CONFIG, global);