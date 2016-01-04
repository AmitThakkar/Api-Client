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
    global.apiServer = {};
    let listeners = {};
    const SOCKET_EVENTS = {
        GET_SCHEMA: 'getSchema',
        GET_ROUTES: 'getRoutes',
        GET_MODULES: 'getModules'
    };
    let registerListener = (eventName) => {
        socket.on(eventName, (error, result) => {
            listeners[eventName](error, result);
        });
    };
    for(let event in SOCKET_EVENTS) {
        registerListener(SOCKET_EVENTS[event]);
    }
    module.exports = (callback) => {
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
                        listeners[SOCKET_EVENTS.GET_SCHEMA] = (error, result) => {
                            arguments[arguments.length - 1](error, result);
                        };
                        socket.emit(SOCKET_EVENTS.GET_SCHEMA, {
                            'databaseName': databaseName,
                            'tableName': tableName,
                            'methodName': value,
                            'arguments': [].slice.call(arguments, 0, arguments.length - 1)
                        });
                    }
                }
            }));
        };
        global.apiServer.getRoutes = (callback) => {
            listeners[SOCKET_EVENTS.GET_ROUTES] = callback;
            socket.emit(SOCKET_EVENTS.GET_ROUTES);
        };
        global.apiServer.getModules = (callback) => {
            listeners[SOCKET_EVENTS.GET_MODULES] = callback;
            socket.emit(SOCKET_EVENTS.GET_MODULES);
        };
    };
})(global, require);