import { createReducer } from "@reduxjs/toolkit";
import { ICartItem, ICartSate } from "../../Interface";
import { getCartItemPrice } from "../../helper/getCartItemPrice";

const cartItems = localStorage.getItem("cartItems");
const cartValue = localStorage.getItem("cartPrice");

const initialState: ICartSate = {
  cart: cartItems ? JSON.parse(cartItems) : [],
  isCartOpen: false,
  cartPrice: cartValue ? Number(JSON.parse(cartValue)) : 0,
  totalSaving: 0,
  couponID: "",
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const existItem = state.cart.find((i) => i._id === item._id);

    if (existItem) {
      const updatedCart: ICartItem[] = state.cart.map((i) =>
        i._id === existItem._id ? item : i
      );
      const cartPrice = updatedCart.reduce(
        (total: number, i: ICartItem) =>
          getCartItemPrice(i) * i.quantity + total,
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
    const item = state.cart.find((i) => i._id === action.payload);
    if (item) {
      const updatedCart = state.cart.filter(
        (i: ICartItem) => i._id !== action.payload
      );
      const cartPrice: number =
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

  totalSaving: (state, action) => {
    return {
      ...state,
      totalSaving: action.payload,
    };
  },

  setCouponId: (state, action) => {
    return {
      ...state,
      couponID: action.payload,
    };
  },
  clearCart: (state) => {
    return {
      ...state,
      cart: [],
      cartPrice: 0,
    };
  },
});
