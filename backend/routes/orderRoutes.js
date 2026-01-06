const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

const auth = require("../middleware/auth");

// ==================================
// USER ROUTES
// ==================================
router.post("/", auth, createOrder);     // CREATE ORDER
router.get("/", auth, getOrders);        // GET USER ORDERS
router.get("/:id", auth, getOrderById);  // GET SINGLE ORDER

// ==================================
// CANCEL ORDER (USER)
// ==================================
router.put("/cancel/:id", auth, cancelOrder);

// ==================================
// UPDATE ORDER STATUS (ADMIN / TEST)
// ==================================
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
