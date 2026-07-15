import api from "./axios";

export const loginRequest = (data) => {
  return api.post("/auth/login", data);
};

export const registerRequest = (data) => {
  return api.post("/auth/signup", data);
};

export const getProfileRequest = () => {
  return api.get("/auth/profile");
};

export const logoutRequest = () => {
  return api.post("/auth/logout");
};
