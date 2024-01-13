import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { UserType } from "../types";

interface UserState {
  currentUser: UserType | null;
  isLoading: boolean;
}

const initialState = {
  currentUser: null,
  isLoading: false,
} as UserState;

export const login = createAsyncThunk<
  any,
  Pick<UserType, "email" | "password">
>("users/login", async (userData) => {
  const res = await api.login(userData);
  return res.data;
});

export const logout = createAsyncThunk<void, void>("users/logout", () =>
  localStorage.removeItem("bearer-token")
);

export const register = createAsyncThunk<
  UserType,
  Omit<UserType, "id" | "token">
>("users/register", async (userData) => {
  const res = await api.register({
    ...userData,
  });
  return res.data;
});

export const getProfile = createAsyncThunk<UserType, void>(
  "users/getProfile",
  async () => {
    const res = await api.getProfile();
    return res.data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("bearer-token", action.payload.token);
      state.isLoading = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getProfile.pending, (state, action) => {
      state.currentUser = null;
      state.isLoading = true;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = userSlice;
export default reducer;
