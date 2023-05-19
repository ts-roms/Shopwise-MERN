const router = require("express").Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { isVerify } = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/order.controller");

// create order
router.post("/", isVerify, catchAsyncError(createOrder));

// get all orders
router.get("/", catchAsyncError(getOrders));

module.exports = router;
