import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileStatsRequest } from "@/api/profileStats";

export const getProfileStats = createAsyncThunk(
  "profileStats/getProfileStats",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getProfileStatsRequest(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load profile stats",
      );
    }
  },
);

const initialState = {
  stats: {
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  },
  status: "idle",
  error: null,
};

const profileStatsSlice = createSlice({
  name: "profileStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileStats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProfileStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stats = action.payload;
      })
      .addCase(getProfileStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default profileStatsSlice.reducer;
