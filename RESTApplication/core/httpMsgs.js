var settings = require("../settings");

exports.show500 = function (req, resp, err) {
    //Check if my particu;lar option is HTML
    if (settings.httpMsgFormat === "HTML") {
        // Use HTML message to sent the error back
        resp.writeHead(500, "Internal Error occured", { "Content-Type": "text/html" });
        // Create the HTML response that will be sent to the client
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal Error occured", { "Content-Type": "application/json" });
        //stingify to the JSON format to sent back the error
        resp.write(JSON.stringify({ data: "ERROR occured:" + err}));
    }
    // When is done end the response
    resp.end();
};

exports.sendJson = function (req, resp, data) {
    // Write the response header HTTP 200 = succes 
    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        // Transform JSON object data to a string in respons and send back to the client
        resp.write(JSON.stringify(data));
    }
    resp.end();
}

exports.show405 = function (req, resp) {
    //Check if my particu;lar option is HTML
    if (settings.httpMsgFormat === "HTML") {
        // Use HTML message to sent the error back
        resp.writeHead(405, "Method Not Supported", { "Content-Type": "text/html" });
        // Create the HTML response that will be sent to the client
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    }
    else {
        // Write the response header HTTP 405 = method not supported
        resp.writeHead(405, "Method Not Supported", { "Content-Type": "application/json" });
        //stingify to the JSON format to sent back the error
        resp.write(JSON.stringify({ data: "Method not supported" }));
    }
    // When is done end the response
    resp.end();
};

exports.show404 = function (req, resp) {
    //Check if my particular option is HTML
    if (settings.httpMsgFormat === "HTML") {
        // Write the response header HTTP 413 = request entity too large 
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        // Create the HTML response that will be sent to the client
        resp.write("<html><head><title>404</title></head><body>404: Resource not found</body ></html > ");
    }
    else {
        // Write the response header HTTP 404 = request not found
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        //stingify to the JSON format to sent back the error
        resp.write(JSON.stringify({ data: "Resource not found" }));
    }
    // When is done end the response
    resp.end();
};

exports.show413 = function (req, resp) {
    //Check if my particular option is HTML
    if (settings.httpMsgFormat === "HTML") {
        // Write the response header HTTP 413 = request entity too large 
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/html" });
        // Create the HTML response that will be sent to the client
        resp.write("<html><head><title>404</title></head><body>413:Request Entity Too Large</body ></html > ");
    }
    else {
        // Write the response header HTTP 413 = request entity too large 
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "application/json" });
        //stingify to the JSON format to sent back the error
        resp.write(JSON.stringify({ data: "Request Entity Too Large" }));
    }
    // When is done end the response
    resp.end();
};

exports.sent200 = function (req, resp) {
    // Write the response header HTTP 200 = succesful 
    resp.writeHead(200, { "Content-Type": "application/json" });
     // When is done end the response
    resp.end();
};

// Some kind of Help page showing the format of endpoints available
exports.showHome = function (req, resp) {
    //Check if my particular option is HTML
    if (settings.httpMsgFormat === "HTML") {
        // Write the response header HTTP 413 = succesful
        resp.writeHead(200, { "Content-Type": "text/html" });
        // Create the HTML response that will be sent to the client
        resp.write("<html><head><title>Home</title></head><body>Valid endpoints: <br>/employees - GET To List All Employees <br>/employees/empno - GET To Serach For An Employee with 'empno' </body ></html > ");
    }
    else {
        // Write the response header HTTP 200 = succesful 
        resp.writeHead(200, { "Content-Type": "application/json" });
        // Colection of stringify to the JSON format to sent back the confirmation: message was sent succesfully 
        // Write a helper message
        resp.write(JSON.stringify(
            { url: "/employees", operation: "GET", description: "List all employees" },
            { url: "/employees/<empono>", operation: "GET", description: "Search for an employee" }

        ));
    }
    // When is done end the response
    resp.end();
};

