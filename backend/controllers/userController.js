const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// Register User (PERMANENT)
// =======================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ REQUIRED FIX (PASSWORD HASH)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password, // ✅ FIXED
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    // 🔥 DUPLICATE EMAIL (PERMANENT FIX)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// =======================
// Login User (PERMANENT)
// =======================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
