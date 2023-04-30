import { createReducer } from "@reduxjs/toolkit";
import { IAllProductState } from "../../Interface";

const inititalState: IAllProductState = {
  isAllProductsLoading: false,
  allProducts: [],
  error: null,
  message: "",
};

export const allProductsReducer = createReducer(inititalState, {
  getAllProducts: (state) => {
    state.isAllProductsLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isAllProductsLoading = false;
    state.allProducts = action.payload;
  },
  getShopAllProductsFail: (state, action) => {
    state.isAllProductsLoading = false;
    state.error = action.payload;
  },
});
