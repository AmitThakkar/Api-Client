/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, process) => {
    'use strict';
    module.exports = {
        logFolder: 'logs',
        logFormat: '{{timestamp}} {{file}}:{{line}} {{message}}',
        environment: 'DEV',
        logLevel: 'trace',
        dateFormat: 'mmmm dd, yyyy HH:MM:ss',
        PORT: 8082,
        HOST: 'localhost',
        API_HOST: 'http://localhost',
        API_PORT: 8080,
        //customApiHandlerDirectory: process.cwd() + '/api/',
        //customModuleDirectory: process.cwd() + '/module/',
        customApiHandlerDirectory: '/Users/amit/Data/Projects/CP/client-code/test/api/',
        customModuleDirectory: '/Users/amit/Data/Projects/CP/client-code/test/module/'
    };
})(module, process);