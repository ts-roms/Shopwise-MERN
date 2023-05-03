import { Dispatch } from "@reduxjs/toolkit";
import { IProduct } from "../../Interface";
import { RootState } from "../store";

// Add to cart
export const addToWishlists =
  (data: IProduct) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: "addToWishlists", payload: data });

    const { wishlists } = getState().wishlists;
    localStorage.setItem("wishlistItems", JSON.stringify(wishlists));
    return data;
  };

// Remove from cart
export const removeFromWishlists =
  (data: IProduct) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: "removeFromWishlits", payload: data._id });

    const { wishlists } = getState().wishlists;
    localStorage.setItem("wishlistItems", JSON.stringify(wishlists));
    return data;
  };
