import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isUserAuthenticate: false,
  isUserLoading: false,
  userError: null,
  user: null,
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
  ClearErrors: (state) => {
    state.userError = null;
  },
});
