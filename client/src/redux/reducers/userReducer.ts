import { createReducer, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.isLoading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.isLoading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    (state.isLoading = false),
      (state.error = action.payload),
      (state.isAuthenticated = false);
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
