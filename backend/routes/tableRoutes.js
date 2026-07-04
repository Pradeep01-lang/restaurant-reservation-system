const express = require("express");
const router = express.Router();

const {
    addTable,
    getTables
} = require("../controllers/tableController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

// Admin only
router.post("/", protect, adminOnly, addTable);

// Logged-in users
router.get("/", protect, getTables);

module.exports = router;