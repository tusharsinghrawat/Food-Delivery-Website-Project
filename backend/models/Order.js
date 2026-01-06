const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        food: {
          type: String,          // ✅ flexible (mock + mongo)
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {                 // ✅ ADDED (UPGRADE)
          type: String,
          default: "",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    deliveryAddress: {          // ✅ name aligned with controller
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
