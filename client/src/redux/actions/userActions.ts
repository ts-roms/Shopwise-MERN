import { Action, Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/users/getuser`, {
      withCredentials: true,
    });

    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error: AxiosError | any) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateUserInfo = (form) => async (dispatch: Dispatch<Action>) => {
  console.log(form);
  try {
    dispatch({ type: "UpdateUserInfoRequest" });
    const { data } = await axios.put(`${server}/users/profile`, form, {
      withCredentials: true,
    });
    dispatch({ type: "UpdateUserInfoSuccess", payload: data.user });
  } catch (error: AxiosError | any) {
    dispatch({
      type: "UpdateUserInfoFailure",
      payload: error.response?.data?.message || error.message,
    });
  }
};
