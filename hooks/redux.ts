import { AppDispatch, RootState } from "../store";
import ReactRedux from "react-redux";

// export const useDispatch: () => AppDispatch = ReactRedux.useDispatch;
export const useSelector: ReactRedux.TypedUseSelectorHook<RootState> =
  ReactRedux.useSelector;
