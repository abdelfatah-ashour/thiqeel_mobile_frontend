import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGeneralSettingsApi } from "../../utils/api/general";

export const fetchGeneralSettings = createAsyncThunk(
  "generalSettings/fetchGeneralSettings",
  async () => {
    return fetchGeneralSettingsApi()
      .then(({ data }) => data?.settings || {})
      .catch(({ data }) => data);
  },
);

export type initGeneralSettingsType = {
  [key: string]: any;
};

const initialState: initGeneralSettingsType = {};

const generalSettings = createSlice({
  name: "generalSettings",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGeneralSettings.fulfilled, (state, { payload }) => {
      return (state = payload);
    });
    builder.addCase(fetchGeneralSettings.rejected, (state, { payload }) => {
      return (state = {});
    });
  },
});

export default generalSettings.reducer;
