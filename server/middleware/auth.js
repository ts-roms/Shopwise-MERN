const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Shop = require("../models/shop.model");

exports.isVerify = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

exports.isSeller = catchAsyncError(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }
  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);

  req.seller = await Shop.findById(decoded.id);

  next();
});
