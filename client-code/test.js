/**
 * Created by Amit Thakkar on 10/19/15.
 */
(() => {
    'use strict';
    getSchema("test", "user", function (schema) {
        schema.find({}, function (error, users) {
            res.status(200).json({users: users, isSucces: false});
        });
    });
})();