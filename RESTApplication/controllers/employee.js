// import db.js
var db = require("../core/db");
// import httpMsgs.js
var httpMsgs = require("../core/httpMsgs");
// import util- a build in package 
var util = require("util");


// All the functions that are necessary to be exported
// The interface used to work with a table called Emp on MyTestDB database

/// <summary>
/// Get the employee list informations
/// <param req> Request object passed automatically fron server.js </param>
/// <param resp> Response object passed automatically fron server.js</param>
/// </summary>
exports.getList = function (req, resp) {
    // This function() will be automatically taken as a parameter of callback() function
    db.executeSql("SELECT * FROM emp", function (data, err) {
        // Check for error
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

/// <summary>
/// Get only one employee row , one employee informations
/// Get the employee list informations
/// <param req> Request object passed automatically fron server.js </param> 
/// <param resp> Response object passed automatically fron server.js</param>
/// <param empno> The employee number that we are going to sent </param>
/// </summary>
exports.get = function (req, resp,empno) {
    db.executeSql("SELECT * FROM emp WHERE empno=" + empno, function (data, err) {
        // Check for error
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

/// <summary>
/// Add/insert an employee - it is usually a POST operation => we need to have the body
/// <param req> Request object passed automatically fron server.js </param> 
/// <param resp> Response object passed automatically fron server.js</param>
/// <param reqBody> Every information will be pass here </param>
/// </summary>
exports.add = function (req, resp, reqBody) {
    // Dinamicaly frame our insert statement and do some validations
    try {
        // Check is reqBody have any information
        if (!reqBody) throw new Error("Input not valid");
        // Parse the information that I received from reqBody
        // Convert the string into JSON object and put into data
        var data = JSON.parce(reqBody);
        // If the data itself is made available
        if (data) {
            // Frame my sql statement
            var sql = "INSERT INTO emp (empno, ename, sal, deptno) VALUES ";
            // Use util library to frame more easy statementsutil.format
            // Make sql statement to be available 
            // data.Empno value  goes in empno
            // data.Ename value goes in ename
            // data.Sal value in sal
            // data.Deptno value in deptno
            sql += util.format("(%d, '%s', %d, %d)", data.Empno, data.Ename, data.Sal, data.Deptno);
            // Execute the state,ment
            db.executeSql(sql, function (data, err) {
                // Check for error
                if (err) {
                    // Trow an error
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    // Sent: It is succesful
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
             throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

/// <summary>
/// Update 
/// <param req> Request object passed automatically fron server.js </param> 
/// <param resp> Response object passed automatically fron server.js</param>
/// <param reqBody> Every information will be pass here </param>
/// </summary>
exports.update = function (req, resp, reqBody) {
    try {
        // Check is reqBody have any information
        if (!reqBody) throw new Error("Input not valid");
        // Parse the information that I received from reqBody
        // Convert the string into JSON object and put into data
        var data = JSON.parce(reqBody);
        // If the data itself is made available
        if (data) {
            // If empno is not provided I can't do nothing
            if (!data.Empno) throw new Error("Empno not provided");

            var sql = "UPDATE emp SET";

            var isDataProvided = false;
            if (data.Ename) {
                // Update my sql statement - string format
                sql += " Ename ='" + data.Ename + "',";
                isDataProvided = true;
            }

            if (data.Sal) {
                // Update my sql statement
                sql += " Sal = " + data.Sal + ",";
                isDataProvided = true;
            }

            if (data.Deptno) {
                // Update my sql statement
                sql += " Deptno = " + data.Deptno + ",";
                isDataProvided = true;
            }

            // Remove the last comma = get everithing except the end character
            sql = sql.slice(0, -1);

            sql += " WHERE empno = " + data.Empno;

            // Execute 
            db.executeSql(sql, function (data, err) {
                // Check for error
                if (err) {
                    // Trow an error
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    // Sent: It is succesful
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

/// <summary>
/// Delete function
/// <param req> Request object passed automatically fron server.js </param> 
/// <param resp> Response object passed automatically fron server.js</param>
/// <param reqBody> Every information will be pass here </param>
/// </summary>
exports.delete = function (req, resp, reqBody) {
    try {
        // Check is reqBody have any information
        if (!reqBody) throw new Error("Input not valid");
        // Parse the information that I received from reqBody
        // Convert the string into JSON object and put into data
        var data = JSON.parce(reqBody);
        // If the data itself is made available
        if (data) {
            // If empno is not provided I can't do nothing
            if (!data.Empno) throw new Error("Empno not provided");

            var sql = "DELETE FROM emp ";

            sql += " WHERE empno = " + data.Empno;

            // Execute 
            db.executeSql(sql, function (data, err) {
                // Check for error
                if (err) {
                    // Trow an error
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    // Sent: It is succesful
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};