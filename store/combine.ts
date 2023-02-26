import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";

export const rootReducer: any = combineReducers({
  auth: authReducer,
});
