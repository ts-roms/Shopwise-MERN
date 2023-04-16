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

router.post("/signup", upload.single("file"), createUser);

router.post("/activation", catchAsyncError(activation));

router.post("/login", catchAsyncError(loginUser));

router.get("/getuser", isVerify, catchAsyncError(getUser));

router.get("/logout", catchAsyncError(logOutUser));

module.exports = router;
