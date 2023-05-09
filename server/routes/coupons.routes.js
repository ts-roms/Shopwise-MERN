const router = require("express").Router();
const {
  getAllCouponsCode,
  verifyCoupons,
} = require("../controllers/coupon.controller");
const { isVerify } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

router.get("/:couponCode", isVerify, catchAsyncError(verifyCoupons));
router.get("/", catchAsyncError(getAllCouponsCode));

module.exports = router;
