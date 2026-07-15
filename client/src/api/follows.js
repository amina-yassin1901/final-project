import api from "./axios";

export const getFollowStatusRequest = (userId) => {
  return api.get(`/follow/status/${userId}`);
};

export const followUserRequest = (userId) => {
  return api.post(`/follow/${userId}`);
};

export const unfollowUserRequest = (userId) => {
  return api.delete(`/follow/${userId}`);
};
