import { createSlice } from "@reduxjs/toolkit";
import { login, getProfile, register } from "./authThunks";
import { updateProfile } from "../users/userThunks";

const initialState = {
  user: null,
  token: null,
  isAuth: false,
  status: "idle",
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("token");
    },
    setInitialized(state) {
      state.initialized = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.initialized = true;
      })

      .addCase(getProfile.rejected, (state) => {
        state.initialized = true;
        state.isAuth = false;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })

      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload;
      });
  },
});

export const { logout, setInitialized } = authSlice.actions;

export default authSlice.reducer;
