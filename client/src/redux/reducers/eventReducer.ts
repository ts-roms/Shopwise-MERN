import { createReducer } from "@reduxjs/toolkit";
import { IEventsState, IServerProductsState } from "../../Interface";

const inititalState: IEventsState = {
  isEventsLoading: true,
  events: [],
  error: null,
  isSuccess: false,
  message: "",
};

export const eventReducer = createReducer(inititalState, {
  // productAddRequest: (state) => {
  //   state.isEventsLoading = true;
  // },
  // productAddSuccess: (state, action) => {
  //   state.isEventsLoading = false;
  //   state.evetns = action.payload;
  //   state.isSuccess = true;
  // },
  // productAddFail: (state, action) => {
  //   state.isEventsLoading = false;
  //   state.error = action.payload;
  //   state.isSuccess = false;
  // },
  // clearError: (state) => {
  //   state.error = null;
  // },

  getShopAllEvents: (state) => {
    state.isEventsLoading = true;
  },

  getShopAllEventsSuccess: (state, action) => {
    state.isEventsLoading = false;
    state.events = action.payload;
  },
  getShopAllEventsFail: (state, action) => {
    state.isEventsLoading = false;
    state.error = action.payload;
  },

  // delete event
  deleteEventRequest: (state) => {
    state.isEventsLoading = true;
  },
  deleteEventSuccess: (state, action) => {
    state.isEventsLoading = false;
    state.message = action.payload.message;
    const deletedEventId = action.payload.eventId;
    state.events = state.events.filter((event) => event._id !== deletedEventId);
  },
  deleteEventFail: (state, action) => {
    state.isEventsLoading = false;
    state.error = action.payload;
  },
});
