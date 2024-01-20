import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./Slice/userSlice";

export const store = configureStore({
  reducer: {
    meal: mealReducer,
  },
});
