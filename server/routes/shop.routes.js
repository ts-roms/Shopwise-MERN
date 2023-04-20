const {
  createShop,
  shopActivation,
  shopLogin,
  getShop,
  getAllProductsOfShop,
} = require("../controllers/shop.controller");
const { isSeller } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const upload = require("../upload");

const router = require("express").Router();

router.post("/create-shop", upload.single("file"), createShop);

router.post("/activation", catchAsyncError(shopActivation));

router.post("/login-shop", catchAsyncError(shopLogin));

router.get("/get-shop", isSeller, getShop);

// get all products of shop
router.get("/:shopId/products", catchAsyncError(getAllProductsOfShop));

module.exports = router;
