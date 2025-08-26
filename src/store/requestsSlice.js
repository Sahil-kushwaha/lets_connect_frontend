import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "Requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
  },
});

export default requestsSlice.reducer;
export const { addRequests, removeRequests } = requestsSlice.actions;
