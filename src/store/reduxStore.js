import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import conectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: conectionsReducer,
    requests: requestsReducer,
  },
});

export { store };
