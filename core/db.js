var sqlDb = require("mssql");
var config = require("../config");

exports.executesql = function (sql, callback) {

    var conn = new sqlDb.Connction(config.dbConfig);
    conn.connect()
    .then(function () {
        var req = new sqlDb.Request(conn);
        req.query(sql)
            .then(function (recordset) {
                callback(recordset);
            })
            .catch(function (err) {
                console.log(err);
                callback(null, err);
            });
    })
    .catch(function (err) {
        console.log(err);
        callback(null, err);
    });
};
