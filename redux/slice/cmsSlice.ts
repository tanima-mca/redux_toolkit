import { isFloat32Array } from "util/types";
import { AxiosInstance } from "../api/axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listState: [],
};

export const list = createAsyncThunk("list", async () => {
  try {
    let response = await AxiosInstance.get(`/get/product`);
    let result = response?.data;

    return result;
  } catch (error) {}
});

export const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(list.pending, (state, { payload }) => {})
      .addCase(list.fulfilled, (state, { payload }) => {
        if (payload.status === true) {
          state.listState = payload;
        }
      })
      .addCase(list.rejected, (state, { payload }) => {});
  },
});

export default cmsSlice.reducer;
