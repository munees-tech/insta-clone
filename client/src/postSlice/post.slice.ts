import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axiosInstance";

const initialState = {
  status: "idle",
  error: null,
  posts: [],
};

export const getPost: any = createAsyncThunk("getposts", async () => {
  try {
    const res = await axiosInstance.get("/post/all");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(`Error in getPostSlice ${error}`);
  }
});

export const likeUnlikePost: any = createAsyncThunk(
  "likeunlike",
  async ({ postId }: { postId: number }) => {
    const res = await axiosInstance.post(`/post/like/${postId}`);
    return res.data;
  }
);

export const addPost: any = createAsyncThunk(
  "addpost",
  async (initialState) => {
    try {
      const res = await axiosInstance.post("/post/", initialState);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(`Error in addPostSlice ${error}`);
    }
  }
);

export const deletePost:any = createAsyncThunk(
  "delete",
  async ({ postId }: { postId: number }) => {
    try {
      await axiosInstance.delete(`/post/${postId}`);
      return postId;
    } catch (error) {
      console.log(`Error in deletePostSlice ${error}`);
    }
  }
);

export const addComment: any = createAsyncThunk(
  "comment",
  async ({ postId, text }: { postId: number; text: string }) => {
    try {
      const res = await axiosInstance.post(`/post/comment/${postId}`, { text });
      return { postId, comment: res.data.comment };
    } catch (error) {
      console.log(`Error in comment slice ${error}`);
      throw error;
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider

      .addCase(likeUnlikePost.fulfilled, (state: any, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post: any) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      })
      .addCase(getPost.fulfilled, (state: any, action) => {
        state.posts = action.payload.map((post: any) => ({
          ...post,
          likeCount: post.like?.length || 0,
        }));
      })
      .addCase(addComment.fulfilled, (state: any, action: any) => {
        const { postId, comments } = action.payload;
        const post = state.posts.find((p: any) => p.id === postId);
        if (post) post.comment = comments;
      })
      .addCase(deletePost.fulfilled, (state: any, action) => {
        const postId = action.payload;
        const post = state.posts.filter((p: any) => {
          p.id !== postId;
        });
        state.posts = post;
      });
  },
});

export const postStatus = (state: any) => state.post.status;
export const selectAllPost: any = (state: any) => state.post.posts;
export const AddPosts: any = (state: any) => state.post.posts;
export const likePosts: any = (state: any) => state.post.posts;
// Selector to get a single post by id
export const selectPostById:any = (state: any, postId: number) =>
state.post.posts.find((post: any) => post.id === postId);

export default postSlice.reducer;
