import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../authSlice/auth.slice';
import { postSlice } from '../postSlice/post.slice';



export default configureStore({
    reducer:{
        auth:authSlice.reducer,
        post:postSlice.reducer
    }
});