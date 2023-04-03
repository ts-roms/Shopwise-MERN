const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const {
  createActivationToken,
  decodeActivationToken,
} = require("../helper/helper");
const { sendMail } = require("../utils/sendMail");
const { sendToken } = require("../utils/jwtToken");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Delete uploaded file
      const filename = req.file.filename;
      const filepath = `uploads/${filename}`;

      fs.unlink(filepath, (error) => {
        if (error) {
          console.log(error);
          return next(new ErrorHandler(error.message, 500));
        }
      });

      return next(new ErrorHandler("User already exists", 400));
    }

    // Save uploaded file
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const expirationTime = new Date(Date.now() + 600000);

    const activationToken = createActivationToken(user, expirationTime);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account.`,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Failed to send activation email", 500));
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Failed to create user", 500));
  }
};

exports.activation = async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const decodedUser = decodeActivationToken(activation_token);

    if (!decodedUser) {
      return next(new ErrorHandler("Invalid user activation token", 400));
    }

    const { name, email, password, avatar } = decodedUser;

    const user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exist", 400));
    }

    const newUser = await User.create({
      name,
      email,
      password,
      avatar,
    });

    sendToken(newUser, 201, res);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Failed to create user", 500));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exist", 404));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Wrong Password", 400));
    }

    sendToken(user, 200, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation error
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return next(new ErrorHandler(errorMessage, 400));
    } else {
      console.error(error);
      return next(new ErrorHandler("Failed to login user", 500));
    }
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User does't exist", 404));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};
