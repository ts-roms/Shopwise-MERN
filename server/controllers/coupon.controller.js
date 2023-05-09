const Coupon = require("../models/cuponcode.model");
const ErrorHandler = require("../utils/errorHandler");

exports.getAllCouponsCode = async (req, res, next) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json(coupons);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

exports.verifyCoupons = async (req, res, next) => {
  try {
    const { couponCode } = req.params;

    const coupon = await Coupon.findOne({ name: couponCode });

    console.log(couponCode);
    console.log(coupon);
    if (!coupon) {
      return next(new ErrorHandler("Coupon code is not valid", 400));
    }

    res.status(200).json(coupon);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};
