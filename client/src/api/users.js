import api from "./axios";

export const getMyProfileRequest = () => {
  return api.get("/user/me");
};

export const updateProfileRequest = (formData) => {
  return api.put("/user/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const searchUsersRequest = (query) => {
  return api.get("/user/search", {
    params: {
      query,
    },
  });
};

export const getUserByIdRequest = (userId) => {
  return api.get(`/user/${userId}`);
};
