import { BASE_URL } from "../utils/constant";
import { io } from "socket.io-client";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    const socket = io(BASE_URL, {
      withCredentials: true,
    });
    return socket;
  } else {
    const socket = io("/", {
      path: "/api/socket.io/",
      withCredentials: true,
    });
    return socket;
  }
};
