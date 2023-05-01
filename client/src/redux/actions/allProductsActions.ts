import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { server } from "../../server";

export const getAllProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "getAllProducts" });

    const { data } = await axios.get(`${server}/products`);

    dispatch({ type: "getAllProductsSuccess", payload: data.products });
  } catch (error: AxiosError | any) {
    dispatch({
      type: "ProductAddFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
