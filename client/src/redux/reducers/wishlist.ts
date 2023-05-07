import { createReducer } from "@reduxjs/toolkit";
import { IProduct, IWishlistState } from "../../Interface";

const wishlistItems = localStorage.getItem("wishlistItems");
const initialState: IWishlistState = {
  wishlists: wishlistItems ? JSON.parse(wishlistItems) : [],
};

export const wishListReducer = createReducer(initialState, {
  addToWishlists: (state, action) => {
    const item = action.payload;
    const existItem = state.wishlists.find((i: IProduct) => i._id === item._id);
    if (existItem) {
      return {
        ...state,
        wishlists: state.wishlists.map((i: IProduct) =>
          i._id === existItem._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        wishlists: [...state.wishlists, item],
      };
    }
  },

  removeFromWishlits: (state, action) => {
    return {
      ...state,
      wishlists: state.wishlists.filter(
        (i: IProduct) => i._id !== action.payload
      ),
    };
  },
});
