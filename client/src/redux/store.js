import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import { taskReducer } from "./reducer/taskReducer";
export const SERVER_URI = "http://localhost:8000";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    task: taskReducer,
  },
});
