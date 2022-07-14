import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./Slices/posts";
import {authReducer} from "./Slices/auth";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
})

export default store