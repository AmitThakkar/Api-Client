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
        API_HOST: 'localhost',
        API_PORT: 8081,
        customApiHandlerDirectory: process.cwd() + '/client-code/'
    };
})(module, process);