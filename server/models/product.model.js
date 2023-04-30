const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter product category!"],
    },
    tags: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please enter product price!"],
    },
    discount_percentage: {
      type: Number,
    },
    discount_price: {
      type: Number,
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock of product"],
    },
    images: [],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
