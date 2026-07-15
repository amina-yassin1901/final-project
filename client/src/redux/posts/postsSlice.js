import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createPostRequest,
  deletePostRequest,
  getAllPostsRequest,
  getUserPostsRequest,
  updatePostRequest,
  getExplorePostsRequest,
} from "@/api/posts";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createPostRequest(formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post",
      );
    }
  },
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPostsRequest();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load feed",
      );
    }
  },
);

export const getUserPosts = createAsyncThunk(
  "post/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserPostsRequest(userId);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load profile posts",
      );
    }
  },
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, formData }, { rejectWithValue }) => {
    try {
      const response = await updatePostRequest(postId, formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update post",
      );
    }
  },
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await deletePostRequest(postId);

      return postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post",
      );
    }
  },
);
export const getExplorePosts = createAsyncThunk(
  "posts/getExplorePosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getExplorePostsRequest();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load explore posts",
      );
    }
  },
);
const initialState = {
  profilePosts: [],
  feedPosts: [],
  explorePosts: [],

  status: "idle",
  error: null,
};

const replacePostInArray = (posts, updatedPost) => {
  const postIndex = posts.findIndex((post) => post._id === updatedPost._id);

  if (postIndex === -1) {
    return;
  }

  const previousPost = posts[postIndex];

  posts[postIndex] = {
    ...previousPost,
    ...updatedPost,

    user:
      typeof updatedPost.user === "object"
        ? updatedPost.user
        : previousPost.user,
  };
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    resetPostsStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.profilePosts.unshift(action.payload);
        state.feedPosts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedPosts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profilePosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";

        replacePostInArray(state.profilePosts, action.payload);
        replacePostInArray(state.feedPosts, action.payload);
        replacePostInArray(state.explorePosts, action.payload);
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.profilePosts = state.profilePosts.filter(
          (post) => post._id !== action.payload,
        );

        state.feedPosts = state.feedPosts.filter(
          (post) => post._id !== action.payload,
        );

        state.explorePosts = state.explorePosts.filter(
          (post) => post._id !== action.payload,
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getExplorePosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getExplorePosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.explorePosts = action.payload;
      })
      .addCase(getExplorePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetPostsStatus } = postsSlice.actions;

export default postsSlice.reducer;
