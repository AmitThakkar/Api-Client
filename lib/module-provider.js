/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, require, CONFIG, global) => {
    "use strict";
    module.exports = () => {
        global.apiServer.modules = {};
        global.apiServer.getModules((error, modules) => {
            if(error) {
                logger.error('Unable to get Module List from API Server');
            } else {
                modules.forEach((module) => {
                    global.apiServer.modules[module.name] = require(CONFIG.customModuleDirectory + module.name);
                });
                logger.info('Module Added!')
            }
        });
    };
})(module, require, CONFIG, global);