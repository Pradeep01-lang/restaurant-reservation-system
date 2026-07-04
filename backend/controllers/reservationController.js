const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

// Create Reservation
const createReservation = async (req, res) => {
    try {
        const { reservationDate, reservationTime, guests } = req.body;

        // Find the smallest suitable table
        const table = await Table.findOne({
            capacity: { $gte: guests }
        }).sort({ capacity: 1 });

        if (!table) {
            return res.status(400).json({
                message: "No suitable table available"
            });
        }

        // Check if table is already booked
        const existingReservation = await Reservation.findOne({
            table: table._id,
            reservationDate,
            timeSlot: reservationTime
        });

        if (existingReservation) {
            return res.status(400).json({
                message: "Table already booked for this time"
            });
        }

        // Create reservation
        const reservation = await Reservation.create({
            user: req.user._id,
            table: table._id,
            reservationDate,
            timeSlot: reservationTime,
            guests
        });

        res.status(201).json({
            message: "Reservation Successful",
            reservation
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Logged-in User Reservations
const getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({
            user: req.user._id
        })
        .populate("table", "tableNumber capacity")
        .sort({ reservationDate: -1 });

        res.json(reservations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Cancel Reservation
const cancelReservation = async (req, res) => {
    try {

        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        if (reservation.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        reservation.status = "Cancelled";
        await reservation.save();

        res.json({
            message: "Reservation Cancelled Successfully",
            reservation
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Reservations (Admin)
const getAllReservations = async (req, res) => {
    try {

        const reservations = await Reservation.find()
            .populate("user", "name email")
            .populate("table", "tableNumber capacity")
            .sort({ reservationDate: -1 });

        res.json(reservations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createReservation,
    getMyReservations,
    cancelReservation,
    getAllReservations
};