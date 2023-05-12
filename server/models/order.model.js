const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: Array,
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      default: "Processing",
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      paymentMethod: {
        type: String,
      },
    },

    paidAt: {
      type: Date,
      default: Date.now(),
    },

    deliverdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
