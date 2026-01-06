const Order = require("../models/Order");
const mongoose = require("mongoose");

// ==================================
// AUTO STATUS FLOW (SAFE DEMO MODE)
// ==================================
const autoUpdateStatus = (orderId, nextStatus, delay) => {
  setTimeout(async () => {
    try {
      const order = await Order.findById(orderId);

      if (!order || order.status === "cancelled") return;

      order.status = nextStatus;
      await order.save();

      console.log(`🟢 Order ${orderId} → ${nextStatus}`);
    } catch (err) {
      console.error("Auto status update error:", err.message);
    }
  }, delay);
};

// ==================================
// CREATE ORDER (PERMANENT FIX – NO NEW FILES)
// ==================================
exports.createOrder = async (req, res) => {
  try {
    console.log("🔥 CREATE ORDER API HIT");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    // 🔎 BASIC VALIDATION
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order items are required" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: "Total amount is required" });
    }

    if (!deliveryAddress || !deliveryAddress.trim()) {
      return res.status(400).json({ error: "Delivery address is required" });
    }

    // ✅ USER ID
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // ✅ FRONTEND-DRIVEN ITEMS (PERMANENT SOLUTION)
    const normalizedItems = [];

    for (let item of items) {
      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({ error: "Invalid quantity" });
      }

      if (!item.price || item.price <= 0) {
        return res.status(400).json({ error: "Invalid price" });
      }

      normalizedItems.push({
        food: item.food,              // can be "3" / string / mongo id
        name: item.name || "Food Item",
        price: item.price,
        image: item.image || "", 
        quantity: item.quantity,
      });
    }

    // ✅ CREATE ORDER
    const order = await Order.create({
      user: userId,
      items: normalizedItems,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || "cod",
      status: "pending",
    });

    // ==================================
    // 🔥 AUTO CONFIRM FLOW (DEMO)
    // ==================================
    autoUpdateStatus(order._id, "confirmed", 10 * 1000);
    autoUpdateStatus(order._id, "preparing", 20 * 1000);
    autoUpdateStatus(order._id, "out_for_delivery", 30 * 1000);
    autoUpdateStatus(order._id, "delivered", 40 * 1000);

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Order Create Error:", error);
    return res.status(500).json({
      error: "Server error while creating order",
    });
  }
};

// ==================================
// GET LOGGED-IN USER ORDERS
// ==================================
exports.getOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Get Orders Error:", error);
    return res.status(500).json({
      error: "Server error while fetching orders",
    });
  }
};

// ==================================
// GET SINGLE ORDER BY ID
// ==================================
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order id" });
    }

    const order = await Order.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("❌ Get Order By ID Error:", error);
    return res.status(500).json({
      error: "Server error while fetching order",
    });
  }
};

// ==================================
// CANCEL ORDER (USER)
// ==================================
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order id" });
    }

    const order = await Order.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status === "delivered") {
      return res.status(400).json({
        error: "Delivered order cannot be cancelled",
      });
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Cancel Order Error:", error);
    return res.status(500).json({
      error: "Server error while cancelling order",
    });
  }
};

// ==================================
// UPDATE ORDER STATUS (ADMIN / TEST)
// ==================================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Update Order Status Error:", error);
    return res.status(500).json({
      error: "Server error while updating order status",
    });
  }
};


