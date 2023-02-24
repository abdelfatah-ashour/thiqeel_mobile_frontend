import { combineReducers, createSlice } from "@reduxjs/toolkit";

const helloWorld = createSlice({
  name: "hello_world",
  initialState: "Hello world",
  reducers: {},
});

export const rootReducer = combineReducers({
  welcome: helloWorld.reducer,
});
