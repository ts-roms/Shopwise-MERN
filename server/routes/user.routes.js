const router = require("express").Router();
const { createUser, activation } = require("../controllers/user.controller");
const upload = require("../upload");
const catchAsyncError = require("../middleware/catchAsyncError");

router.post("/", upload.single("file"), createUser);

router.post("/activation", catchAsyncError(activation));

module.exports = router;
