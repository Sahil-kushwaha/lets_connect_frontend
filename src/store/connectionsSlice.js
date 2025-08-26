import { createSlice } from "@reduxjs/toolkit";
/* eslint-disable */
const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      return null;
    },
  },
});

export default connectionsSlice.reducer;
export const { addConnections, removeConnections } = connectionsSlice.actions;
