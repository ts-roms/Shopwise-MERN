export default function calculateDiscountPrice(
  price: number,
  discountPercentage: number
) {
  const discountAmount = price * (discountPercentage / 100);
  const discountPrice = price - discountAmount;
  return discountPrice;
  //   return discountAmount;
}
