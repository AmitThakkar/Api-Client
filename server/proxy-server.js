/**
 * Created by Amit Thakkar on 10/19/15.
 */
((global, require) => {
    'use strict';
    let callbackStore = {};
    let callbackCount = 0;
    const net = require('net');
    const CONFIG = global.config;
    const PORT = process.env.API_PORT || CONFIG.API_PORT;
    const HOST = CONFIG.API_HOST;
    const client = net.connect({port: PORT, host: HOST}, () => {
        logger.info('Connected with API Server at %s:%s', HOST, PORT);
        require('../client-code/test');
    });
    client.on('data', (data) => {
        let dataObject = JSON.parse(data);
        callbackStore[dataObject.callbackCount](dataObject.result);
        delete callbackStore[dataObject.callbackCount];
    });
    client.on('end', () => {
        logger.info('Disconnected from API Server');
    });
    global.getSchema = (databaseName, tableName, callback) => {
        callback(Proxy.create({
            get: (obj, value) => {
                return function () {
                    logger.info(value, [].slice.call(arguments, 0, arguments.length - 1));
                    callbackStore[++callbackCount] = arguments[arguments.length - 1];
                    console.log(callbackStore)
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
})(global, require);