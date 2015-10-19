/**
 * Created by Amit Thakkar on 10/19/15.
 */
((global) => {
    'use strict';
    global.getSchema = (databaseName, tableName, callback) => {
        callback(Proxy.create({
            get: (obj, value) => {
                return function () {
                    logger.info(value, [].slice.call(arguments, 0, arguments.length - 1), arguments[arguments.length - 1]);
                    client.write(JSON.stringify({
                        'eventName': 'getSchema',
                        'databaseName': databaseName,
                        'tableName': tableName,
                        'methodName': value,
                        'arguments': [].slice.call(arguments, 0, arguments.length - 1)
                    }));
                    return value
                }
            }
        }));
    };
})(global);