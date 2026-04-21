const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL@1234",
    database: "order_management"
});

// Get Order History
app.get("/orders", (req, res) => {
    const sql = `
    SELECT c.name, p.name AS product, o.quantity, o.total
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    JOIN products p ON o.product_id = p.id`;

    db.query(sql, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

// Highest Order
app.get("/highest", (req, res) => {
    const sql = `SELECT * FROM orders
    WHERE total = (SELECT MAX(total) FROM orders)`;

    db.query(sql, (err, result) => {
        res.json(result);
    });
});

// Most Active Customer
app.get("/active", (req, res) => {
    const sql = `
    SELECT name FROM customers
    WHERE id = (
        SELECT customer_id FROM orders
        GROUP BY customer_id
        ORDER BY COUNT(*) DESC LIMIT 1
    )`;

    db.query(sql, (err, result) => {
        res.json(result);
    });
});

app.get("/", (req, res) => {
    res.send("Order Management API is running");
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));