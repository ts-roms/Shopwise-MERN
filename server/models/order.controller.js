const Order = require("../models/order.model");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createOrder = async (req, res, next) => {
  try {
    const userID = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User is not found", 400));
    }

    const { cart } = req.body;

    // grouping order by shop
    const shopItem = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItem.has(shopId)) {
        shopItem.set(shopId, item,[])
      }
      shopItem.get(shopId).push(item)
    }

    // create a order for each shop
    const orders = []

    for (const [shopId, item] of shopItem ) {
        const order = new Order.create({cart: item})
        orders.push(order)
    }

    res.status(201).json(orders)

  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};
