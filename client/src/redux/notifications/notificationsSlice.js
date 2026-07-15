import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getNotificationsRequest } from "@/api/notifications";

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotificationsRequest();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load notifications",
      );
    }
  },
);

const initialState = {
  notifications: [],
  notificationsCount: 0,
  unreadCount: 0,
  status: "idle",
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    markNotificationReadLocally: (state, action) => {
      const notification = state.notifications.find(
        (item) => item._id === action.payload,
      );

      if (notification && !notification.isRead) {
        notification.isRead = true;

        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.notifications = action.payload.notifications;

        state.notificationsCount = action.payload.notificationsCount;

        state.unreadCount = action.payload.notifications.filter(
          (notification) => !notification.isRead,
        ).length;
      })

      .addCase(getNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { markNotificationReadLocally } = notificationsSlice.actions;

export default notificationsSlice.reducer;
