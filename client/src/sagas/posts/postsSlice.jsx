import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    search_posts: [],
    detail_post: {},
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
                error: null,
            }
        },
        getPostsSuccess: (state, action) => {
            return {
                ...state,
                posts: action.payload,
                error: null,
            }
        },
        uploadImageRequest: (state) => {
            return {
                ...state,
                error: null,
            }
        },
        // uploadImageSuccess: (state) => {
        //     return {
        //         ...state,
        //         error: null,
        //     }
        // },
        searchPostsRequest: (state) => {
            return {
                ...state,
                error: null,
            }
        },
        getSearchPostsSuccess: (state, action) => {
            return {
                ...state,
                search_posts: action.payload,
                error: null,
            }
        },
        postDetailRequest: (state) => {
            return {
                ...state,
                error: null,
            }
        },
        getDetailPostSuccess: (state, action) => {
            return {
                ...state,
                detail_post: action.payload,
                error: null,
            }
        },
        likePostRequest: (state) => {
            return {
                ...state,
                error: null,
            }
        },
        likePostSuccess: (state) => {
            return {
                ...state,
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
        setLoadingPost: (state, action) => {
            return {
                ...state,
                loading: action.payload
            }
        }
    }
})

export const { getPostsSuccess, postsRequest, requestFailure, likePostRequest, likePostSuccess, setLoadingPost, getDetailPostSuccess, postDetailRequest, getSearchPostsSuccess, searchPostsRequest, uploadImageRequest } = postsSlice.actions
export default postsSlice.reducer