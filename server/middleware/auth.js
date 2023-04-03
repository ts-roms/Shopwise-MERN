const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.isVerify = catchAsyncError(async (req, res, next) => {
  const token = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_EXPIRE);

  req.user = await User.findById(decoded.id);

  next();
});
