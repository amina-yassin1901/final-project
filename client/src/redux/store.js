import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import profileStatsReducer from "./profileStats/profileStatsSlice";
import postsReducer from "./posts/postsSlice";
import notificationsReducer from "./notifications/notificationsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profileStats: profileStatsReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
  },
});
