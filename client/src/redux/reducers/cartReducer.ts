import { createReducer } from "@reduxjs/toolkit";
import { ICartItem, ICartSate } from "../../Interface";

const cartItems = localStorage.getItem("cartItems");
const initialState: ICartSate = {
  cart: cartItems ? JSON.parse(cartItems) : [],
  isCartOpen: false,
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const existItem = state.cart.find((i: ICartItem) => i._id === item._id);
    if (existItem) {
      return {
        ...state,
        cart: state.cart.map((i: ICartItem) =>
          i._id === existItem._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i: ICartItem) => i._id !== action.payload),
    };
  },

  toggleCart: (state) => {
    return {
      ...state,
      isCartOpen: !state.isCartOpen,
    };
  },
});
