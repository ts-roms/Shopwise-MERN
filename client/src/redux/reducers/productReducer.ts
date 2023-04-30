import { createReducer } from "@reduxjs/toolkit";
import { IServerProductsState } from "../../Interface";

const inititalState: IServerProductsState = {
  isProductsLoading: true,
  products: [],
  error: null,
  isSuccess: false,
  message: "",
};

export const productReducer = createReducer(inititalState, {
  // get shop product
  getShopAllProducts: (state) => {
    state.isProductsLoading = true;
  },

  getShopAllProductsSuccess: (state, action) => {
    state.isProductsLoading = false;
    state.products = action.payload;
  },
  getShopAllProductsFail: (state, action) => {
    state.isProductsLoading = false;
    state.error = action.payload;
  },

  // delete product
  deleteProductRequest: (state) => {
    state.isProductsLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isProductsLoading = false;
    state.message = action.payload.message;
    const deletedProductId = action.payload.productId;
    state.products = state.products.filter(
      (product) => product._id !== deletedProductId
    );
  },
  deleteProductFail: (state, action) => {
    state.isProductsLoading = false;
    state.error = action.payload;
  },
});
