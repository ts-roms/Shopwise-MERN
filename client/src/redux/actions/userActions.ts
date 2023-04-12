import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/users/getuser`, {
      withCredentials: true,
    });

    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: "LoadUserSuccess",
        payload: { id: null, username: null, email: null },
      });
    } else {
      dispatch({
        type: "LoadUserFail",
        error: error.message,
      });
    }
  }
};
