export default function calculateDiscountPrice(
  price: number,
  discountPercentage: number
) {
  if (discountPercentage > 99) {
    return 0;
  }
  const discountAmount = price * (discountPercentage / 100);
  const discountPrice = price - discountAmount;
  return discountPrice;
}
