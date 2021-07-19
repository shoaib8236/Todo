import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../pages/todo/slice"


export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
