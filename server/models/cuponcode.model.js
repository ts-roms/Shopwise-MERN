const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please enter event product name!"],
    },
    value: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
    },
    selectedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CouponCode", couponCodeSchema);
