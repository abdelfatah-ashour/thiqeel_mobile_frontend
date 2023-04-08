import {
  AnyAction,
  StoreEnhancer,
  ThunkMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { rootReducer } from "./combine";
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// init store
const store = configureStore<
  any,
  AnyAction,
  [ThunkMiddleware<any, AnyAction>],
  [StoreEnhancer]
>({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
