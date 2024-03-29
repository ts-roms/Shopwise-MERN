const Order = require("../models/order.model");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const calculateCartPrice = require("../utils/calculateCartPrice");

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User is not logged in", 400));
    }

    const { cartWithIDandQty, shippingAddress, paymentInfo, couponID } =
      req.body;

    let { paidPrice } = req.body;

    if (!paidPrice) {
      const totalPrice = await calculateCartPrice(cartWithIDandQty, couponID);
      paidPrice = totalPrice;
    }

    if (!cartWithIDandQty || !shippingAddress || !paidPrice || !paymentInfo) {
      return next(new ErrorHandler("Bad request", 400));
    }

    const productIds = cartWithIDandQty.map((product) => product.productId);

    const cartProducts = await Product.find({ _id: { $in: productIds } });

    const shopItemsMap = new Map();

    for (const product of cartProducts) {
      const shopId = product.shop.toString();
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }

      const transformed = {
        product: product._id.toString(),
        quantity:
          cartWithIDandQty?.find(
            (item) => item.productId === product._id.toString()
          )?.productQuantity || 0,
      };
      shopItemsMap.get(shopId).push(transformed);
    }
    const orders = [];

    for (const [shopId, products] of shopItemsMap) {
      const order = await Order.create({
        cart: products,
        shippingAddress,
        user: userId,
        totalPrice: paidPrice,
        paymentInfo,
        shop: shopId,
      });
      orders.push(order);
    }

    res.status(201).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("cart.product").populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};

// get all order of user
