import { createReducer } from "@reduxjs/toolkit";
import { IUserState } from "../../Interface";

const initialState: IUserState = {
  isUserAuthenticate: false,
  isUserLoading: false,
  userError: null,
  user: {
    _id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
  },
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.isUserLoading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isUserAuthenticate = true;
    state.isUserLoading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    (state.isUserLoading = false),
      (state.userError = action.error),
      (state.isUserAuthenticate = false);
  },

  // update user
  UpdateUserInfoRequest: (state, action) => {
    state.isUserLoading = true;
  },

  UpdateUserInfoSuccess: (state, action) => {
    state.isUserLoading = false;
    state.user = action.payload;
  },
  UpdateUserInfoFailure: (state, action) => {
    state.isUserLoading = false;
    state.userError = action.payload;
  },

  // update user address
  // UpdateUserAddressrequest: (state, action) => {
  //   state.isUserLoading = true;
  // },

  UpdateUserAddressSuccess: (state, action) => {
    // state.isUserLoading = false;
    state.user = action.payload;
  },

  UpdateUserAddressFailure: (state, action) => {
    state.isUserLoading = false;
    state.userError = action.payload;
  },
  // clear error
  ClearErrors: (state) => {
    state.userError = null;
  },
});
