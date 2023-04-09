import { createReducer, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticate: false,
  isLoading: false,
  error: null,
  user: null,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.isLoading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticate = true;
    state.isLoading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    (state.isLoading = false),
      (state.error = action.payload),
      (state.isAuthenticate = false);
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
