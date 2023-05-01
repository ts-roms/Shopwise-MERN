import { createReducer } from "@reduxjs/toolkit";
import { ICartItem } from "../../Interface";

const cartItems = localStorage.getItem("cartItems");
const initialState = {
  cart: cartItems ? JSON.parse(cartItems) : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const existItem = state.cart.find((i: ICartItem) => i._id === item.id);
    if (existItem) {
      return {
        ...state,
        cart: state.cart.map((i: ICartItem) =>
          i._id === existItem.id ? item : i
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
});
