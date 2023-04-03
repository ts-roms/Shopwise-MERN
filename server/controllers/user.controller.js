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

    // const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

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

    console.log(newUser);

    sendToken(newUser, 201, res);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Failed to create user", 500));
  }
};
