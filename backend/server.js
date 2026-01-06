const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/**
 * ✅ FINAL CORS CONFIG (PRODUCTION SAFE)
 */
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite
    "http://localhost:8080", // Live Server / other frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
