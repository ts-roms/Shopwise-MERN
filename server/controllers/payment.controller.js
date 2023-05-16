const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/product.model");
const Coupon = require("../models/cuponcode.model");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res, next) => {
  try {
    // const { cartPrice } = req.body;

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: cartPrice,
    //   currency: "INR",
    //   metadata: {
    //     company: "Shopwise",
    //   },
    // });

    const { cartWithIDandQty, couponID } = req.body;

    if (cartWithIDandQty.length <= 0 || cartWithIDandQty == undefined) {
      return next(new ErrorHandler("Bad cart request", 400));
    }

    const productsIds = cartWithIDandQty?.map((item) => item.productId);

    // construct a query
    const query = { _id: { $in: productsIds } };
    const cartProducts = await Product.find(query);

    let cartPrice = 0;
    for (const item of cartProducts) {
      const cartItem = cartWithIDandQty.find(
        (cartItem) => cartItem.productId === item._id.toString()
      );
      const itemPrice = item.price * cartItem.productQuantity;
      cartPrice += itemPrice;
    }

    console.log(cartPrice);

    if (couponID) {
      const coupon = await Coupon.findById(couponID);

      if (!coupon) {
        return next(new Error("Coupon not found", 404));
      }
    }

    res.status(201).json(cartProducts);
    // .json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};

exports.getStripeSecretKey = async (req, res, next) => {
  try {
    res.status(200).json(process.env.STRIPE_PUBLISHABLE_KEY);
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};
