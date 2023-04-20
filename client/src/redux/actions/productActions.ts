import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IAddProduct } from "../../Interface";
import { server } from "../../server";

interface GetShopAllProductsAction {
  type: "getShopAllProducts";
}

interface GetShopAllProductsSuccessAction {
  type: "getShopAllProductsSuccess";
  payload: [] | any;
}

interface GetShopAllProductsFailAction {
  type: "getShopAllProductsFail";
  payload: string;
}

axios.defaults.withCredentials = true;

export const addProduct =
  (newForm: IAddProduct) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "productAddRequest" });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`${server}/products`, newForm, config);

      dispatch({ type: "productAddSuccess", payload: data.product });
    } catch (error: AxiosError | any) {
      console.log(error);
      dispatch({
        type: "ProductAddFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const getShopAllProducts =
  (sellerId: string) =>
  async (
    dispatch: Dispatch<
      | GetShopAllProductsAction
      | GetShopAllProductsSuccessAction
      | GetShopAllProductsFailAction
    >
  ) => {
    try {
      dispatch({ type: "getShopAllProducts" });

      const { data } = await axios.get(`${server}/shops/${sellerId}/products`);

      dispatch({ type: "getShopAllProductsSuccess", payload: data.products });
    } catch (error: AxiosError | any) {
      console.log(error);
      dispatch({
        type: "getShopAllProductsFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
