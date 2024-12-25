import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState : [],
  reducers: {
    addPostSlice: (state, action) => {
      // const newPost = {
      //   postStatus: true,
      //   postData: action.payload,
        state.posts.push(action.payload); 
        // console.log("All posts : ", state.posts);
      },


    getPostsSlice: (state, action) => {
      state.posts.slug = action.payload.slug;

      // state.posts.postImage = action.payload.postImage;
      // state.posts.postTitle = action.payload.postTitle;
      // state.posts.postContent = action.payload.postContent;

    },

    deletePostSlice: (state, action) => {
      state.posts = state.posts.filter((post) => {
        post.slug !== action.payload;
      });
    },
  },
});

export const { addPostSlice, getPostsSlice, deletePostSlice } =
  postSlice.actions;

export default postSlice.reducer;
