import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params) => {
    try {
      const { data } = await axios.post('/posts', params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
//создай реакт компонент и стили как калькулятор айфона
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default postSlice.reducer;
