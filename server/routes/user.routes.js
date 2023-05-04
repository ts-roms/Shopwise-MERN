const router = require("express").Router();
const {
  createUser,
  activation,
  loginUser,
  getUser,
  logOutUser,
  updateUserProfile,
  updateUserProfilePicture,
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

// update user
router.put("/profile", isVerify, catchAsyncError(updateUserProfile));

// update profile picture
router.put(
  "/avatar",
  isVerify,
  upload.single("file"),
  catchAsyncError(updateUserProfilePicture)
);

// logout user
router.get("/logout", catchAsyncError(logOutUser));

module.exports = router;
