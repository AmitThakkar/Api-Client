/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module) => {
    module.exports = {
        "0": function (req, res, next) {
            console.log("Hello From Handler 1");
            next();
        },
        "1": function (req, res) {
            getSchema("test", "employees", function (Employee) {
                Employee.find({}, (error, employees) => {
                    res.status(200).json({employees: employees, isSuccess: false});
                });
            });
        }
    };
})(module);