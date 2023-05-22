import { createReducer } from "@reduxjs/toolkit";
import { IEventsState } from "../../Interface";

const inititalState: IEventsState = {
  isEventsLoading: true,
  events: [],
  shopEvents: [],
  error: null,
  isSuccess: false,
  message: "",
};

export const eventReducer = createReducer(inititalState, {
  getShopAllEvents: (state) => {
    state.isEventsLoading = true;
  },

  getShopAllEventsSuccess: (state, action) => {
    state.isEventsLoading = false;
    state.shopEvents = action.payload;
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

  // get all events
  getALLEvents: (state) => {
    state.isEventsLoading = true;
  },
  getAllEventsSuccess: (state, action) => {
    state.isEventsLoading = false;
    state.events = action.payload;
  },

  getAllEventsError: (state, action) => {
    state.isEventsLoading = false;
    state.error = action.payload;
  },
});
