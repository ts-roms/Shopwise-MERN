import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { IAddProduct } from "../../Interface";
import { server } from "../../server";

axios.defaults.withCredentials = true;

export const addProduct =
  (newForm: IAddProduct) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "productAddRequest" });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`${server}/products`, newForm, config);

      dispatch({ type: "productAddSuccess", payload: data.product });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: "ProductAddFail",
        payload: error.response.data.message,
      });
    }
  };
