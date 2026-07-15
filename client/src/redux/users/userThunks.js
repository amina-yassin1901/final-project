import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfileRequest } from "@/api/users.js";

export const updateProfile = createAsyncThunk(
  "user/updateProfile",

  async (formData, thunkAPI) => {
    try {
      const response = await updateProfileRequest(formData);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);
