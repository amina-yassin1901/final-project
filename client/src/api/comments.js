import api from "./axios";

export const getPostCommentsRequest = (postId) => {
  return api.get(`/comment/${postId}`);
};

export const addCommentRequest = (postId, text) => {
  return api.post(`/comment/${postId}`, {
    text,
  });
};
