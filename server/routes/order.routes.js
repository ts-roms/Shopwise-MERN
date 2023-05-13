const router = require("express").Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { createOrder } = require("../models/order.controller");
const { isVerify } = require("../middleware/auth");

router.post("/", isVerify, catchAsyncError(createOrder));
