import api from "./axios";

export const getPostLikesRequest = (postId) => {
  return api.get(`/like/${postId}`);
};

export const toggleLikeRequest = (postId) => {
  return api.post(`/like/${postId}`);
};
