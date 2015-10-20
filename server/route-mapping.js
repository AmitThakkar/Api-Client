/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, require, CONFIG) => {
    "use strict";
    const fs = require('fs');
    module.exports = (app) => {
        fs.readdir(CONFIG.customApiHandlerDirectory, (error, files) => {
            files.forEach((fileName) => {
                let apiDetails = fileName.match(/(.*)-(.*).js/);
                let apiHandlers = require(CONFIG.customApiHandlerDirectory + fileName);
                let apiDetailsAndHandlers = ['/' + apiDetails[1]];
                for(let key in apiHandlers) {
                    apiDetailsAndHandlers.push(apiHandlers[key]);
                }
                app[apiDetails[2].toLowerCase()].apply(app, apiDetailsAndHandlers);
            });
        });
    };
})(module, require, CONFIG);