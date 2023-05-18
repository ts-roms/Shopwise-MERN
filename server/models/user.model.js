const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email!"],
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Please enter your password!"],
      minLength: [6, "Password should be minimun 6 character!"],
      select: false,
    },

    primaryPhoneNumber: {
      type: Number,
      trim: true,
    },

    secondaryPhoneNumber: {
      type: Number,
      trim: true,
    },

    addresses: [
      {
        country: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        address1: {
          type: String,
          required: true,
          trim: true,
        },
        address2: {
          type: String,
          required: true,
          trim: true,
        },
        address3: {
          type: String,
          trim: true,
        },
        zipcode: {
          type: Number,
          required: true,
          trim: true,
        },
        addressType: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

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
