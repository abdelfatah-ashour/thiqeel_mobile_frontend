import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../Types/shared";

export type initAuthType = {
  user: UserType;
  token: string;
};

const initialState: initAuthType = {
  user: {
    user_id: 0,
  },
  token: "",
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: function (state, { payload }) {
      state.user = payload;
    },
    setToken: function (state, { payload }) {
      state.token = payload;
    },
    updateUser: function (state, { payload }) {
      state.user = {
        ...state.user,
        ...payload,
      };
    },
  },
});

export const { setUser, setToken, updateUser } = auth.actions;

export default auth.reducer;
