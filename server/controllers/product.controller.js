const Product = require("../models/product.model");
const Shop = require("../models/shop.model");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");

// add product
exports.addProduct = async (req, res, next) => {
  try {
    const sellerId = req.seller.id;

    const shop = await Shop.findById(sellerId);

    if (!shop) {
      return next(new ErrorHandler("Invalid Seller id", 400));
    }

    const files = req.files;
    const imageUrls = files.map((file, idx) => {
      const filename = file.filename;
      const extension = path.extname(filename);
      const nameWithoutExtension = filename.slice(0, -extension.length);
      return {
        id: idx + 1,
        url: filename,
        name: nameWithoutExtension,
        type: file.mimetype,
        size: file.size,
      };
    });

    const productData = req.body;

    productData.images = imageUrls;
    productData.shop = shop._id;

    const product = await Product.create(productData);

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};

// get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("shop");

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};
