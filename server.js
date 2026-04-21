const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL@1234",   // change if you set password
    database: "studentdb"
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// Add Student
app.post("/addStudent", (req, res) => {
    const { name, email, dob, department, phone } = req.body;

    const sql = "INSERT INTO students(name,email,dob,department,phone) VALUES (?,?,?,?,?)";

    db.query(sql, [name, email, dob, department, phone], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.send("Student Added Successfully");
        }
    });
});

// Get Students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});
app.get("/columns", (req, res) => {
    db.query("DESCRIBE students", (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});
app.listen(5000, () => console.log("Server running on port 5000"));