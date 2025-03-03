import { stat } from "fs";
import { AxiosInstance } from "../api/axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggle: false,
};

export const registerCrud = createAsyncThunk(
  "register",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await AxiosInstance.post(`/create/user`, formData);
      let result = response?.data;
      localStorage.setItem("user_token", result.token);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginCrud = createAsyncThunk(
  "login",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await AxiosInstance.post(`/login/user`, formData);
      let result = response?.data;
      localStorage.setItem("user_token", result.token);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyCrud = createAsyncThunk(
  "verify-otp",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await AxiosInstance.post(`/verify-otp`, formData);
      let result = response?.data;
      localStorage.setItem("user_token", result.token);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassCrud = createAsyncThunk(
  "updatePass",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await AxiosInstance.post(`/update/password`, formData);
      let result = response?.data;
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_token");
    },

    Check_token: (state) => {
      let token = localStorage.getItem("user_token");
      if (token) {
        state.isToggle = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginCrud.pending, (state, { payload }) => {})
      .addCase(loginCrud.fulfilled, (state, { payload }) => {
        if (payload.status === true) {
          state.isToggle = true;
        }
      })
      .addCase(loginCrud.rejected, (state, { payload }) => {})

      // Register
      .addCase(registerCrud.pending, (state, { payload }) => {})
      .addCase(registerCrud.fulfilled, (state, { payload }) => {})
      .addCase(registerCrud.rejected, (state, { payload }) => {})

      // Verification
      .addCase(verifyCrud.pending, (state, { payload }) => {})
      .addCase(verifyCrud.fulfilled, (state, { payload }) => {})
      .addCase(verifyCrud.rejected, (state, { payload }) => {})

      // updatepassword
      .addCase(updatePassCrud.pending, (state, { payload }) => {})
      .addCase(updatePassCrud.fulfilled, (state, { payload }) => {})
      .addCase(updatePassCrud.rejected, (state, { payload }) => {});
  },
});

export const { logOut, Check_token } = authSlice.actions;

export default authSlice.reducer;
