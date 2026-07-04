const express = require("express");
const router = express.Router();

const {
    createReservation,
    getMyReservations,
    cancelReservation,
    getAllReservations
} = require("../controllers/reservationController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);
router.put("/:id/cancel", protect, cancelReservation);
router.get("/", protect, adminOnly, getAllReservations);

module.exports = router;