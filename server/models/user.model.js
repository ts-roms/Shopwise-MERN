const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email!"],
    },

    password: {
      type: String,
      required: [true, "Please enter your password!"],
      minLength: [6, "Password should be minimun 6 character!"],
      select: false,
    },

    address: String,

    role: {
      type: String,
      default: "user",
    },

    avatar: {
      type: String,
      requried: true,
    },

    resetPasswordToken: String,

    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// comapre password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
