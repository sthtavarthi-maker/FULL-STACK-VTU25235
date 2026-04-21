const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/transfer", async (req, res) => {
    const { userId, merchantId, amount } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Check user balance
        const [rows] = await connection.query(
            "SELECT balance FROM users WHERE id = ?",
            [userId]
        );

        if (!rows.length || rows[0].balance < amount) {
            throw new Error("Insufficient balance");
        }

        // 2. Deduct from user
        await connection.query(
            "UPDATE users SET balance = balance - ? WHERE id = ?",
            [amount, userId]
        );

        // 3. Add to merchant
        await connection.query(
            "UPDATE merchants SET balance = balance + ? WHERE id = ?",
            [amount, merchantId]
        );

        // 4. Commit transaction
        await connection.commit();

        res.send({ message: "Payment Successful" });

    } catch (err) {
        await connection.rollback();
        res.status(400).send({ message: err.message });

    } finally {
        connection.release();
    }
});

app.get("/", (req, res) => {
    res.send("Payment Simulation API is running successfully");
});
// ✅ IMPORTANT: server should start ONLY ONCE here
app.listen(3000, () => {
    console.log("Server running on port 3000");
});