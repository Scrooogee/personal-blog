import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => await axios.get('/posts'))

export const fetchTags = createAsyncThunk('posts/fetchTags', async() => await axios.get('/tags'))

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async() => await axios.get('/posts/popular'))

export const fetchRemove = createAsyncThunk('posts/fetchRemove', async(id) => await axios.delete(`/posts/${id}`))



const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
};

const PostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // Get all posts
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'succes';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
        // Get all tags
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
            state.tags.items = [];
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'succes';
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },
        // Get popular sort
        [fetchPopularPosts.pending]: (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.status = 'succes';
            state.posts.items = action.payload;
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
        // Delet post
        [fetchRemove.pending]: (state, action) => {
            state.posts.items.data = state.posts.items.data.filter(obj => obj._id !== action.meta.arg);
        }
    }
});

console.log(initialState)


export const PostReducer = PostSlice.reducer 