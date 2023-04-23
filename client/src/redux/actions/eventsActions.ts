import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IAddProduct } from "../../Interface";
import { server } from "../../server";

axios.defaults.withCredentials = true;

// export const addEvent =
//   (newForm: IAddProduct) => async (dispatch: Dispatch) => {
//     try {
//       dispatch({ type: "productAddRequest" });

//       const config = { headers: { "Content-Type": "multipart/form-data" } };

//       const { data } = await axios.post(`${server}/products`, newForm, config);

//       dispatch({ type: "productAddSuccess", payload: data.product });
//     } catch (error: AxiosError | any) {
//       console.log(error);
//       dispatch({
//         type: "ProductAddFail",
//         payload: error.response?.data?.message || error.message,
//       });
//     }
//   };

export const getShopAllEvents =
  (sellerId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "getShopAllEvents" });

      const { data } = await axios.get(`${server}/shops/${sellerId}/events`);

      dispatch({ type: "getShopAllEventsSuccess", payload: data.events });
    } catch (error: AxiosError | any) {
      console.log(error);
      dispatch({
        type: "getShopAllEventsFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const deleteEvent =
  (eventId: string, shopId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "deleteEventRequest" });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.delete(
        `${server}/shops/${shopId}/products/${eventId}`,
        config
      );

      dispatch({ type: "deleteEventSuccess", payload: data.message });
    } catch (error: AxiosError | any) {
      console.log(error);
      dispatch({
        type: "deleteEventFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
