/**
 * Created by Amit Thakkar on 10/19/15.
 */
module.exports = {
    "0": function (req, res, next) {
        console.log("Hello");
        next();
    },
    "1": function (req, res) {
        getSchema("test", "user", function (schema) {
            schema.find({}, function (error, users) {
                res.status(200).json({users: users, isSuccess: false});
            });

        });
    }
};