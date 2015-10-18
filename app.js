/**
 * Created by Amit Thakkar on 10/17/15.
 */
((global) => {
    'use strict';
    global.getSchema = (databaseName, tableName, callback) => {
        callback(Proxy.create({
            get: (obj, value) => {
                return function () {
                    console.log(value, [].slice.call(arguments, 0, arguments.length - 1), arguments[arguments.length - 1]);
                    return value
                }
            }
        }));
    };
    getSchema("test", "user", function (schema) {
        schema.find({}, function (error, users) {
            res.status(200).json({users: users, isSucces: false});
        });
    });
})(global);