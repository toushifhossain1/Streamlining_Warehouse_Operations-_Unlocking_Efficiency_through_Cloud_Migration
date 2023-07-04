const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection

mongoose.connect("mongodb+srv://warehouse:1234@warehouse.3y1ta1t.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Warehouse schema
const warehouseSchema = new mongoose.Schema({
    warehouse: String,
    data: Object,
});
const Warehouse = mongoose.model("Warehouse", warehouseSchema);

// Insert Data Endpoint
app.post("/insert", async (req, res) => {
    const data = req.body;
    const warehouse = data.warehouse;

    try {
        // Save data to the database
        const newWarehouse = new Warehouse({ warehouse, data });
        await newWarehouse.save();
        console.log(`Data inserted for ${warehouse}`);
        res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error inserting data" });
    }
});

// Retrieve Data Endpoint
app.get("/data", async (req, res) => {
    const warehouse = req.query.warehouse;

    try {
        // Retrieve data from the database for the specified warehouse
        const data = await Warehouse.find({ warehouse });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving data" });
    }
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
