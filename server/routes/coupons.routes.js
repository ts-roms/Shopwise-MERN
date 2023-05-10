const router = require("express").Router();
const {
  getAllCouponsCode,
  verifyCoupons,
} = require("../controllers/coupon.controller");
const { isVerify } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

router.get("/", catchAsyncError(getAllCouponsCode));

router.post("/", isVerify, catchAsyncError(verifyCoupons));

module.exports = router;
