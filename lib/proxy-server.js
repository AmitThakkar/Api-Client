/**
 * Created by Amit Thakkar on 10/19/15.
 */
((global, require) => {
    'use strict';
    module.exports = (callback) => {
        let callbackStore = {};
        let callbackCount = 0;
        const net = require('net');
        const CONFIG = global.CONFIG;
        const logger = global.logger;
        const PORT = process.env.API_PORT || CONFIG.API_PORT;
        const HOST = CONFIG.API_HOST;
        const client = net.connect({port: PORT, host: HOST}, () => {
            logger.info('Connected with API Server at %s:%s', HOST, PORT);
            callback();
        });
        client.on('data', (data) => {
            let dataObject = JSON.parse(data);
            if (!dataObject.eventName) {
                callbackStore[dataObject.callbackCount](dataObject.result);
                delete callbackStore[dataObject.callbackCount];
            }
        });
        client.on('end', () => {
            logger.info('Disconnected from API Server');
        });
        global.getSchema = (databaseName, tableName, callback) => {
            callback(Proxy.create({
                get: (obj, value) => {
                    return function () {
                        callbackStore[++callbackCount] = (result) => {
                            arguments[arguments.length - 1](result[0], result[1]);
                        };
                        client.write(JSON.stringify({
                            'eventName': 'getSchema',
                            'databaseName': databaseName,
                            'tableName': tableName,
                            'callbackCount': callbackCount,
                            'methodName': value,
                            'arguments': [].slice.call(arguments, 0, arguments.length - 1)
                        }));
                        return value
                    }
                }
            }));
        };
        global.getRoutes = (callback) => {
            callbackStore[++callbackCount] = callback;
            client.write(JSON.stringify({
                'eventName': 'getRoutes',
                'callbackCount': callbackCount
            }));
        };
    };
})(global, require);