import { createReducer } from "@reduxjs/toolkit";

const inititalState = {
  isProductLoading: true,
  product: null,
  error: null,
  isSuccess: false,
};

export const productReducer = createReducer(inititalState, {
  productAddRequest: (state) => {
    state.isProductLoading = true;
  },
  productAddSuccess: (state, action) => {
    state.isProductLoading = false;
    state.product = action.payload;
    state.isSuccess = true;
  },
  productAddFail: (state, action) => {
    state.isProductLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});
