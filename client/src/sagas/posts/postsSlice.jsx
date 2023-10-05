import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getPostsSuccess: (state, action) => {
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null,
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
    }
})

export const { getPostsSuccess, postsRequest, requestFailure } = postsSlice.actions
export default postsSlice.reducer