// Import http module
var http = require("http");
// Import employee.js module
var emp = require("../controllers/employee");
// import  setting.js module
var settings = require("../settings");
// import httpMsgs.js
var httpMsgs = require("./httpMsgs");


// Start the server itself 
// The function(req,resp) is a callback function that will be executed for each of those request that we will receive 
// We have the req, resp already filed by http module
http.createServer(function (req, resp) {
    // Check what kind of request I received
    switch (req.method) {
        case "GET":
            // End-points : 
            //              http://web:9000/employees                   GET (fetch/read/query)
            //              http://web:9000/employee/5001               GET (fetch/read/query)  
            if (req.url === "/") {
                // Show thr Home Page
                httpMsgs.showHome(req, resp);
            }
            else if (req.url === "/employees") {
                // Get the list of all employees
                emp.getList(req, resp);
            }
            else {
                // Use regular expression 
                // 0 to 9 any number of time
                var empnoPatt = "[0-9]+";
                // Create a new regular expression object based on '/employees' and empnoPatt
                var patth = new RegExp("/employees" + empnoPatt);
                // Test if my particular pattern is valid
                if (patt.test(req.url)) {
                    // Extract that paticular emplyee number
                    patt = new RegExp(empnoPatt);
                    // Get the employee number that is available of part of request url
                    var empno = patt.exec(req.url);
                    // Call the get() function with the particular empno
                    emp.get(req, resp, empno);
                }
                else {
                    // Error- resourse not found
                    httpMsgs.show404(req, resp);
                }
            }
            break;
        case "POST":
            // End-points : 
            //              http://web:9000/employees       POST (insert)
            // We are sending some informations (object) to Node.js from HTTP
            // Add informations from the database
            if (req.url === "/employees") {
                // We need to get the request body
                var reqBody = '';
                // Register the "data" event
                // This data got fired for each chunck of information that data receive
                // function(data) will be continuously execute as long as we don't receive data anymore
                req.on("data", function (data) {
                    // Append that data to my reqBody
                    reqBody += data;
                    // Check-up: if the information that we sent to the Client is less than limit = 10MB
                    if (reqBody.lenght > 1e7)   //10 MB
                    {
                        // Error - request entity too large
                        httpMsgs.show413(req, resp);
                    }
                });

                // Register the "end "event
                // If is no more data to sent, all the chunks are already received
                req.on("end", function (data) {
                    // Pass the reqBody to our employee
                    emp.add(req, resp, reqBody);
                });
            }
            else {
                // Error - resource not found
                httpMsgs.show404(req, resp);
            }
            break;
        case "PUT":
            // End-points : 
            //              http://web:9000/employees       PUT (update)
            if (req.url === "/employees") {
                // We need to get the request body
                var reqBody = '';
                // Register the "data" event
                // This data got fired for each chunck of information that data receive
                // function(data) will be continuously execute as long as we don't receive data anymore
                req.on("data", function (data) {
                    // Append that data to my reqBody
                    reqBody += data;
                    // Check-up: if the information that we sent to the Client is less than limit = 10MB
                    if (reqBody.lenght > 1e7)   //10 MB
                    {
                        // Error - request entity too large
                        httpMsgs.show413(req, resp);
                    }
                });

                // Register the "end "event
                // If is no more data to sent, all the chunks are already received
                req.on("end", function (data) {
                    // Pass the reqBody to our employee
                    emp.update(req, resp, reqBody);
                });
            }
            else {
                // Error - resource not found
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            // End-points : 
            //              http://web:9000/employees       DELETE (delete)
            if (req.url === "/employees") {
                // We need to get the request body
                var reqBody = '';
                // Register the "data" event
                // This data got fired for each chunck of information that data receive
                // function(data) will be continuously execute as long as we don't receive data anymore
                req.on("data", function (data) {
                    // Append that data to my reqBody
                    reqBody += data;
                    // Check-up: if the information that we sent to the Client is less than limit = 10MB
                    if (reqBody.lenght > 1e7)   //10 MB
                    {
                        // Error - request entity too large
                        httpMsgs.show413(req, resp);
                    }
                });

                // Register the "end "event
                // If is no more data to sent, all the chunks are already received
                req.on("end", function (data) {
                    // Pass the reqBody to our employee
                    emp.delete(req, resp, reqBody);
                });
            }
            else {
                // Error - resource not found
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            // Error -  method not supported
            httpMsgs.show405(req,resp);
            break;
    }
}).listen(settings.webPort, function () {
    // Write to the console the number of the port were we listening
    console.log("Started listening at:" + settings.webPort);
});