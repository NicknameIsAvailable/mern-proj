import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./Slices/posts";

const store = configureStore({
    reducer: {
        posts: postsReducer
    }
})

export default store