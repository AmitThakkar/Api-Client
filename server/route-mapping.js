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
                var apiHandler = require(CONFIG.customApiHandlerDirectory + fileName);
                app[apiDetails[2].toLowerCase()]('/' + apiDetails[1], apiHandler['0'], apiHandler['1'])
            });
        });
    };
})(module, require, CONFIG);