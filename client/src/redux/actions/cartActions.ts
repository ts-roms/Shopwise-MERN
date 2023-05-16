import { Dispatch } from "@reduxjs/toolkit";
import { ICartItem } from "../../Interface";
import { RootState } from "../store";

// Add to cart
export const addToCart =
  (data: ICartItem) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: "addToCart", payload: data });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    localStorage.setItem(
      "cartPrice",
      JSON.stringify(getState().cart.cartPrice)
    );
    return data;
  };

// Remove from cart
export const removeFromCart =
  (data: ICartItem) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: "removeFromCart", payload: data._id });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    localStorage.setItem(
      "cartPrice",
      JSON.stringify(getState().cart.cartPrice)
    );
    return data;
  };

// toggle cart
export const toggleCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: "toggleCart" });
};

// total saving
export const totalSavingCalculate =
  (totalSaving: number) => async (dispatch: Dispatch) => {
    dispatch({ type: "totalSaving", payload: totalSaving });
  };

export const setCouponId = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: "setCouponId", payload: id });
};
