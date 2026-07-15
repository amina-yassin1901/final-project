import api from "./axios";

export const createPostRequest = (formData) => {
  return api.post("/post/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllPostsRequest = () => {
  return api.get("/post");
};

export const getUserPostsRequest = (userId) => {
  return api.get(`/post/user/${userId}`);
};

export const updatePostRequest = (postId, formData) => {
  return api.put(`/post/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePostRequest = (postId) => {
  return api.delete(`/post/${postId}`);
};
export const getExplorePostsRequest = () => {
  return api.get("/post/explore");
};
export const getPostByIdRequest = (postId) => {
  return api.get(`/post/${postId}`);
};
