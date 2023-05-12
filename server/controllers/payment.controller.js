const ErrorHandler = require("../utils/errorHandler");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { cartPrice } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartPrice,
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
    next(new ErrorHandler(error.message, 500));
  }
};

exports.getStripeSecretKey = async (req, res, next) => {
  try {
    console.log("sdssa");
    res.status(200).json(process.env.STRIPE_PUBLISHABLE_KEY);
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
};
