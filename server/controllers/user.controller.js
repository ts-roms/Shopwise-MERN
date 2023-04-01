const path = require("path");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };

  console.log(user);
  res.send(user);
};
