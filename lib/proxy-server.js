/**
 * Created by Amit Thakkar on 10/19/15.
 */
((global, require) => {
    'use strict';
    const CONFIG = global.CONFIG;
    const HOST = CONFIG.API_HOST;
    const PORT = process.env.API_PORT || CONFIG.API_PORT;
    var socket = require('socket.io-client')(HOST + ':' + PORT);
    const logger = global.logger;
    module.exports = (callback) => {
        global.apiServer = {};
        socket.on('connect', function () {
            logger.info('Connected with API Server at %s:%s', HOST, PORT);
            callback();
        });
        socket.on('disconnect', function () {
            logger.info('Disconnected with API Server at %s:%s', HOST, PORT);
        });
        global.apiServer.getSchema = (databaseName, tableName, callback) => {
            callback(Proxy.create({
                get: (obj, value) => {
                    return function () {
                        socket.emit('getSchema', {
                            'databaseName': databaseName,
                            'tableName': tableName,
                            'methodName': value,
                            'arguments': [].slice.call(arguments, 0, arguments.length - 1)
                        });
                        socket.on('getSchema', (error, result) => {
                            arguments[arguments.length - 1](error, result);
                        });
                    }
                }
            }));
        };
        global.apiServer.getRoutes = (callback) => {
            socket.emit('getRoutes');
            socket.on('getRoutes', (error, result) => {
                callback(error, result);
            });
        };
        global.apiServer.getModules = (callback) => {
            socket.emit('getModules');
            socket.on('getModules', (error, result) => {
                callback(error, result);
            });
        };
    };
})(global, require);