const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/product.model");
const Coupon = require("../models/cuponcode.model");
const { getCartItemPrice } = require("../helper/helper");
const calculateCartPrice = require("../utils/calculateCartPrice");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { cartWithIDandQty, couponID } = req.body;

    if (!cartWithIDandQty || cartWithIDandQty.length === 0) {
      return next(new ErrorHandler("Bad cart request", 400));
    }

    const totalAmount = await calculateCartPrice(cartWithIDandQty, couponID);

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

// ----------------------------------------------------------------
// {
//   "paymentIntent": {
//     "id": "pi_3N93q3SEyKqpV3Gt1yaDFmlp",
//     "object": "payment_intent",
//     "amount": 1605,
//     "amount_details": {
//       "tip": {}
//     },
//     "automatic_payment_methods": null,
//     "canceled_at": null,
//     "cancellation_reason": null,
//     "capture_method": "automatic",
//     "client_secret": "pi_3N93q3SEyKqpV3Gt1yaDFmlp_secret_ay3iBZbzUxFnV5hxZodNHojSJ",
//     "confirmation_method": "automatic",
//     "created": 1684404819,
//     "currency": "inr",
//     "description": null,
//     "last_payment_error": null,
//     "livemode": false,
//     "next_action": null,
//     "payment_method": "pm_1N93q4SEyKqpV3GtStX9BRph",
//     "payment_method_types": [
//       "card"
//     ],
//     "processing": null,
//     "receipt_email": null,
//     "setup_future_usage": null,
//     "shipping": null,
//     "source": null,
//     "status": "succeeded"
//   }
// }
