import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import generalSettingsSlice from "./slices/generalSettingsSlice";

export const rootReducer: any = combineReducers({
  auth: authSlice,
  settings: generalSettingsSlice,
});
