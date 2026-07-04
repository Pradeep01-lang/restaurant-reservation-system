const Table = require("../models/Table");

// Add a new table (Admin)
const addTable = async (req, res) => {
    try {
        const { tableNumber, capacity } = req.body;

        const table = await Table.create({
            tableNumber,
            capacity,
            isAvailable: true
        });

        res.status(201).json({
            message: "Table Added Successfully",
            table
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all tables
const getTables = async (req, res) => {
    try {
        const tables = await Table.find();

        res.json(tables);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addTable,
    getTables
};