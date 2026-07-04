const express = require("express");
const router = express.Router();

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

// Logged-in users only
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Welcome",
        user: req.user
    });
});

// Admin only
router.get("/admin", protect, adminOnly, (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
});

module.exports = router;