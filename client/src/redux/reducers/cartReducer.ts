import { createReducer } from "@reduxjs/toolkit";
import { ICartItem, ICartSate } from "../../Interface";

const cartItems = localStorage.getItem("cartItems");
const cartValue = localStorage.getItem("cartPrice");
const initialState: ICartSate = {
  cart: cartItems ? JSON.parse(cartItems) : [],
  isCartOpen: false,
  cartPrice: cartValue ? JSON.parse(cartValue) : 0,
  couponDisount: 0,
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const existItem = state.cart.find((i: ICartItem) => i._id === item._id);

    if (existItem) {
      const updatedCart = state.cart.map((i: ICartItem) =>
        i._id === existItem._id ? item : i
      );
      const cartPrice = updatedCart.reduce(
        (total, i) => getCartItemPrice(i) * i.quantity + total,
        0
      );
      return {
        ...state,
        cart: updatedCart,
        cartPrice,
      };
    } else {
      const cartPrice =
        state.cart.reduce(
          (total, i) => getCartItemPrice(i) * i.quantity + total,
          0
        ) +
        getCartItemPrice(item) * item.quantity;
      return {
        ...state,
        cart: [...state.cart, item],
        cartPrice,
      };
    }
  },

  removeFromCart: (state, action) => {
    const item = state.cart.find((i: ICartItem) => i._id === action.payload);
    if (item) {
      const updatedCart = state.cart.filter(
        (i: ICartItem) => i._id !== action.payload
      );
      const cartPrice =
        state.cart.reduce(
          (total, i) => getCartItemPrice(i) * i.quantity + total,
          0
        ) -
        getCartItemPrice(item) * item.quantity;
      return {
        ...state,
        cart: updatedCart,
        cartPrice,
      };
    } else {
      return state;
    }
  },

  toggleCart: (state) => {
    return {
      ...state,
      isCartOpen: !state.isCartOpen,
    };
  },
});

function getCartItemPrice(item: ICartItem) {
  return item.discount_price > 0 ? item.discount_price : item.price;
}
