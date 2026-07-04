const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

// Register
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "customer"
        });

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        
        res.status(201).json({
            message: "User Registered Successfully",
            token: generateToken(user._id, user.role),
            user: userResponse
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        
        res.json({
            message: "Login Successful",
            token: generateToken(user._id, user.role),
            user: userResponse
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { register, login };