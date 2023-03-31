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
      minLength: [8, "Password should be minimun 8 character!"],
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

userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async (enterPassword) => {
  return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
