const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const ErrorHandler = require("../utils/errorHandler");
const {
  createActivationToken,
  decodeActivationToken,
} = require("../helper/helper");
const { sendMail } = require("../utils/sendMail");
const { sendToken } = require("../utils/jwtToken");

// register user
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

// activate user account
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

// login user
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

// get user information
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

exports.updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { email, password, primaryPhoneNumber, secondaryPhoneNumber, name } =
      req.body;

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Enter Correct Password", 400));
    }

    user.name = name;
    user.email = email;
    user.primaryPhoneNumber = primaryPhoneNumber;
    user.secondaryPhoneNumber = secondaryPhoneNumber;

    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};

exports.updateUserProfilePicture = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const existingUser = await User.findById(userId);

    const existingPath = `uploads/${existingUser.avatar}`;
    fs.unlinkSync(existingPath);
    const filepath = path.join(req.file.filename);

    const user = await User.findByIdAndUpdate(userId, { avatar: filepath });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};

exports.addUserAdress = async (req, res, next) => {
  try {
    const {
      country,
      state,
      address1,
      address2,
      address3,
      zipcode,
      addressType,
    } = req.body;

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const sameTypeAdress = user.addresses.find(
      (address) => address.addressType === addressType
    );

    if (sameTypeAdress) {
      return next(new ErrorHandler(`${addressType} already exists`, 400));
    }

    user.addresses.push({
      country,
      state,
      address1,
      address2,
      address3,
      zipcode,
      addressType,
    });

    await user.save();

    res.status(201).json({ message: "Address added successfully", user });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(error.message, 500));
  }
};

// user can delete address
exports.deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const addressId = req.params.addressId;

    const address = user.addresses.find((address) => address._id == addressId);

    if (!address) {
      return next(new ErrorHandler("Address not found", 404));
    }

    user.addresses.pull(addressId);

    await user.save();

    res.status(201).json({ message: "Address deleted successfully", user });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(error.message, 500));
  }
};

// user change password
exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const userId = req.user.id;

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    if (newPassword != confirmNewPassword) {
      return next(
        new ErrorHandler(
          "New password is not match with confrimed password",
          400
        )
      );
    }
    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid old password", 400));
    }

    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(error.message, 500));
  }
};

// log out user
exports.logOutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({ success: true, message: "Log out Successful!" });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};

// get all user orders
exports.getAllOrdersOfUser = async (req, res, next) => {
  try {
    const userID = req.user.id;

    const userOrders = await Order.find({ user: userID });

    res.status(200).json({ success: true, orders: userOrders });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};
