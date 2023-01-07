import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me')
    return data
});

export const fetchReg = createAsyncThunk('auth/fetchReg', async (params) => {
    const {data} = await axios.post('/auth/register', params)
    return data
});

const initialState = {
    data: null,
    status: 'loading'
};


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'succes';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'succes';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchReg.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchReg.fulfilled]: (state, action) => {
            state.status = 'succes';
            state.data = action.payload;
        },
        [fetchReg.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
})

export const {logout} = AuthSlice.actions

export const AuthReducer = AuthSlice.reducer