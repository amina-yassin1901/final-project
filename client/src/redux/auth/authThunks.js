import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileRequest } from "@/api/auth";
import { loginRequest } from "@/api/auth";
import { registerRequest } from "@/api/auth";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await loginRequest(data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed",
    );
  }
});
export const getProfile = createAsyncThunk(
  "auth/getProfile",

  async (_, thunkAPI) => {
    try {
      const response = await getProfileRequest();

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unauthorized",
      );
    }
  },
);
export const register = createAsyncThunk(
  "auth/register",

  async (data, thunkAPI) => {
    try {
      const response = await registerRequest(data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);
