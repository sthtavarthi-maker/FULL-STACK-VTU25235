const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "MySQL@1234",
    database: "payment_db"
});

module.exports = pool.promise();