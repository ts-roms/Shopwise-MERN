import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

export const loadSeller = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: "LoadSellerRequest" });

    const { data } = await axios.get(`${server}/shops/get-shop`, {
      withCredentials: true,
    });

    dispatch({ type: "LoadSellerSuccess", payload: data.shop });
  } catch (error: any) {
    dispatch({
      type: "LoadSellerFail",
      error: error.message,
    });
  }
};
