const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Enter your MySQL password here
    database: "wms"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to MySQL Database");
});

// Store Data Endpoint
app.post("/store-data", (req, res) => {
    const { data } = req.body;

    const encryptedData = data;

    const sql = "INSERT INTO warehouseonedata (EncryptedData) VALUES (?)";
    const values = [encryptedData];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error storing data:", err);
            res.status(500).json({ message: "Error storing data" });
        } else {
            console.log("Data stored successfully!");
            res.status(200).json({ message: "Data stored successfully" });
        }
    });
});


// Retrieve All Data Endpoint
app.get("/all-data", (req, res) => {
    const sql = "SELECT * FROM warehouseonedata";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error retrieving data:", err);
            res.status(500).json({ message: "Error retrieving data" });
        } else {
            res.status(200).json(result);
        }
    });
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
