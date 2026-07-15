import api from "./axios";

export const getProfileStatsRequest = (userId) => {
  return api.get(`/user/stats/${userId}`);
};
