import { Dispatch } from "@reduxjs/toolkit";
import { ICartItem } from "../../Interface";
import { RootState } from "../store";

// Add to cart
export const addToCart =
  (data: ICartItem) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: "addToCart", payload: data });

    const { cart } = getState().cart;
    localStorage.setItem("cartItems", JSON.stringify(cart));
    return data;
  };

// Remove from cart
export const removeFromCart =
  (data: ICartItem) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: "removeFromCart", payload: data._id });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  };

// toggle cart
export const toggleCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: "toggleCart" });
};
