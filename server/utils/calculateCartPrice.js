const Coupon = require("../models/cuponcode.model");
const Product = require("../models/product.model");
const { getCartItemPrice } = require("../helper/helper");

module.exports = async function (cartWithIDandQty, couponID) {
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

  return totalAmount;
};
