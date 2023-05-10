const Coupon = require("../models/cuponcode.model");
const ErrorHandler = require("../utils/errorHandler");
const formattedPrice = require("../utils/fromatPrice");

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
    const { couponCode, totalBill } = req.body;

    const coupon = await Coupon.findOne({ name: couponCode }).populate("shop");

    if (!coupon) {
      return next(new ErrorHandler("Coupon code is not valid", 400));
    }

    if (parseFloat(totalBill) < parseFloat(coupon.minAmount)) {
      return next(
        new ErrorHandler(
          `Purchase should be eqaul or more than ${formattedPrice(
            coupon.minAmount
          )}`,
          400
        )
      );
    }

    res.status(200).json(coupon);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};
