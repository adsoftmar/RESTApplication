// Var to connect with SQL server using mssql package
var sqlDb = require("mssql");

// Var to have access the Database configuration 
var settings = require("../settings");

// executeSql is the function that get in touch with SQL server 
// Execute the sql statement that I provide and the callback function with 2 parameters:
//         first: the data to fill in
//         second : the error
exports.executeSql = function (sql, callback) {
    // Create a connection instance
    var conn = new sqlDb.Connection(settings.dbConfig);
    // Open the connection and have the request that will be executed
    // The err object will be filled authomatically by Node.js and forward to us
    conn.connect()
        // If the connection is succesful
        .then(function () {
            // Create a request instance
            var req = new sqlDb.Request(conn);
            // Execute the request 
            req.query(sql)
                // When the function(recordset) is executed it is pass automatically the recordset by mssql driver
                .then(function(recordset) {
                    callback(recordset);
                })
                 // If this is going to have an error it will be executed function(err)
                .catch(function(err) {
                    // Log the error to the server
                    console.log(err);
                    // Execute a callback with no data just to pass the error object
                    callback(null, err);
                });
        })
        // If is an error 
        .catch(function(err) {
            // Log the error to the server
            console.log(err);
            // Execute a callback with no data just to pass the error object
            callback(null, err);
        });

};