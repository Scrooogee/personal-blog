import { configureStore } from "@reduxjs/toolkit";
import { PostReducer } from "./slices/post";
import { AuthReducer } from "./slices/auth";


const store = configureStore({
    reducer: {
        PostReducer,
        AuthReducer
    }
});

export default store;