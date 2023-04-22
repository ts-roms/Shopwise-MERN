const router = require("express").Router();
const upload = require("../upload");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { addProduct } = require("../controllers/product.controller");
const { isSeller } = require("../middleware/auth");

// add product
router.post(
  "/",
  isSeller,
  upload.array("images"),
  catchAsyncErrors(addProduct)
);

module.exports = router;
