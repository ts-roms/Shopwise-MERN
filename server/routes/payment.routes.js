const router = require("express").Router();
const {
  createPaymentIntent,
  getStripeSecretKey,
} = require("../controllers/payment.controller");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isVerify } = require("../middleware/auth");

router.post(
  "/create-payment-intent",
  isVerify,
  catchAsyncError(createPaymentIntent)
);

router.get("/stripe-secret-key", catchAsyncError(getStripeSecretKey));

module.exports = router;
