import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticate: false,
  isSellerLoading: false,
  sellerError: null,
  seller: null,
};

export const SellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isSellerLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSellerAuthenticate = true;
    state.isSellerLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isSellerLoading = false;
    state.sellerError = action.error;
    state.isSellerAuthenticate = false;
  },
  ClearErrors: (state) => {
    state.sellerError = null;
  },
});
