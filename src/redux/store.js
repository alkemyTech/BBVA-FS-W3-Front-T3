import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import accountArsReducer from "./accountArsSlice";
import accountUsdReducer from "./accountUsdSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accountArs: accountArsReducer,
    accountUsd: accountUsdReducer,
  },
});
