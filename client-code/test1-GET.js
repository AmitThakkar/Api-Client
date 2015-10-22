/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module) => {
    module.exports = function (request, response) {
        console.log("Hello From Handler 1");
        getSchema("test", "employee", function (Employee) {
            Employee.find({}, (error, employees) => {
                response.status(200).json({employees: employees, isSuccess: false});
            });
        });
    };
})(module);