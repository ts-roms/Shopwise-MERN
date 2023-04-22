const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter event product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter event product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter event product category!"],
    },
    startDate: {
      type: Date,
      required: [true, "Please enter event product start date!"],
    },
    endDate: {
      type: Date,
      required: [true, "Please enter event product end date!"],
    },
    status: {
      type: String,
      default: "running",
    },
    tags: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please enter event product price!"],
    },
    discount_percentage: {
      type: Number,
    },
    discount_price: {
      type: Number,
    },
    stock: {
      type: Number,
      required: [true, "Please enter event the stock of product"],
    },
    images: [
      {
        type: String,
      },
    ],
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

module.exports = mongoose.model("Event", eventSchema);
