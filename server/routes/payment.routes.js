const router = require("express").Router();
const {
  createPaymentIntent,
  getStripeSecretKey,
} = require("../controllers/payment.controller");
const catchAsyncError = require("../middleware/catchAsyncError");

router.get("/create-payment-intent", catchAsyncError(createPaymentIntent));

router.get("/stripe-secret-key", catchAsyncError(getStripeSecretKey));

module.exports = router;
