const Product = require("../models/product.model");
const Shop = require("../models/shop.model");
const ErrorHandler = require("../utils/errorHandler");

exports.addProduct = async (req, res, next) => {
  try {
    const sellerId = req.seller.id;

    const shop = await Shop.findById(sellerId);

    if (!shop) {
      return next(new ErrorHandler("Invalid Seller id", 400));
    }

    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);

    const productData = req.body;

    productData.images = imageUrls;
    productData.shop = shop._id;

    const product = await Product.create(productData);

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(err.message, 500));
  }
};
