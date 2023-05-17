const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/product.model");
const Coupon = require("../models/cuponcode.model");
const { getCartItemPrice } = require("../helper/helper");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { cartWithIDandQty, couponID } = req.body;

    if (!cartWithIDandQty || cartWithIDandQty.length === 0) {
      return next(new ErrorHandler("Bad cart request", 400));
    }

    const productsIds = cartWithIDandQty.map((item) => item.productId);

    // Retrieve cart products from the database
    const cartProducts = await Product.find({ _id: { $in: productsIds } });

    let cartPrice = 0;

    // Calculate the cart price
    for (const item of cartProducts) {
      const cartItem = cartWithIDandQty.find(
        (cartItem) => cartItem.productId === item._id.toString()
      );
      const itemPrice = getCartItemPrice(item) * cartItem.productQuantity;
      cartPrice += itemPrice;
    }

    let totalAmount = cartPrice;
    const shippingCharge = 15000;

    if (cartPrice < 150000) {
      totalAmount += shippingCharge;
    }

    if (couponID) {
      const coupon = await Coupon.findById(couponID);

      if (!coupon) {
        return next(new ErrorHandler("Coupon not found", 404));
      }

      if (cartPrice >= coupon.minAmount) {
        const eligibleItems = cartProducts.filter(
          (item) => item.shop.toString() === coupon.shop.toString()
        );

        let eligibleItemsPrice = 0;

        // Calculate the eligible items price
        for (const item of eligibleItems) {
          const cartItem = cartWithIDandQty.find(
            (cartItem) => cartItem.productId === item._id.toString()
          );
          const itemPrice = getCartItemPrice(item) * cartItem.productQuantity;
          eligibleItemsPrice += itemPrice;
        }

        const discount = (coupon.value * eligibleItemsPrice) / 100;
        totalAmount -= discount;
      }
    }
    console.log(totalAmount);
    console.log(couponID);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount),
      currency: "INR",
      metadata: {
        company: "Shopwise",
      },
    });

    res
      .status(201)
      .json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Internal Server Error", 500));
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
