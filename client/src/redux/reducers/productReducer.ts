import { createReducer } from "@reduxjs/toolkit";

const inititalState = {
  isProductsLoading: true,
  products: [],
  error: null,
  isSuccess: false,
};

export const productReducer = createReducer(inititalState, {
  productAddRequest: (state) => {
    state.isProductsLoading = true;
  },
  productAddSuccess: (state, action) => {
    state.isProductsLoading = false;
    state.products = action.payload;
    state.isSuccess = true;
  },
  productAddFail: (state, action) => {
    state.isProductsLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },
  clearError: (state) => {
    state.error = null;
  },

  getShopAllProducts: (state) => {
    state.isProductsLoading;
  },

  getShopAllProductsSuccess: (state, action) => {
    state.isProductsLoading = false;
    state.products = action.payload;
  },
  getShopAllProductsFail: (state, action) => {
    state.isProductsLoading = false;
    state.error = action.payload;
  },
});
