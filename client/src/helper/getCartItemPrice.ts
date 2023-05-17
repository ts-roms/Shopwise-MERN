import { ICartItem } from "../Interface";

export function getCartItemPrice(item: ICartItem) {
  return item.discount_percentage > 0 ? item.discount_price : item.price;
}
