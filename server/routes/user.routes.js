const router = require("express").Router();
const {
  createUser,
  activation,
  loginUser,
  getUser,
  logOutUser,
} = require("../controllers/user.controller");
const upload = require("../upload");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isVerify } = require("../middleware/auth");

// register user
router.post("/signup", upload.single("file"), createUser);

// activate user
router.post("/activation", catchAsyncError(activation));

// login user
router.post("/login", catchAsyncError(loginUser));

// retrive user information
router.get("/getuser", isVerify, catchAsyncError(getUser));

// logout user
router.get("/logout", catchAsyncError(logOutUser));

module.exports = router;
