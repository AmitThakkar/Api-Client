/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module) => {
    module.exports = {
        "0": function (req, res, next) {
            console.log("Hello");
            next();
        },
        "1": function (req, res) {
            getSchema("test", "user", function (users) {
                users.find({}, (error, users) => {
                    res.status(200).json({users: users, isSuccess: false});
                });
            });
        }
    };
})(module);