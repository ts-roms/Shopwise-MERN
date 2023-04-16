const {
  createShop,
  shopActivation,
  shopLogin,
  getShop,
} = require("../controllers/shop.controller");
const { isSeller } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const upload = require("../upload");

const router = require("express").Router();

router.post("/create-shop", upload.single("file"), createShop);

router.post("/activation", catchAsyncError(shopActivation));

router.post("/login-shop", catchAsyncError(shopLogin));

router.get("/get-shop", isSeller, getShop);

module.exports = router;
