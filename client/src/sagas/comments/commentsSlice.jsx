import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false,
    error: null,
    notify: '',
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentsRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        postCommentsRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getCommentsSuccess: (state, action) => {
            return {
                ...state,
                comments: action.payload,
                loading: false,
                error: null,
            }
        },
        postCommentsSuccess: (state, action) => {
            return {
                ...state,
                notify: action.payload,
                loading: false,
                error: null,
            }
        },
        setNotify: (state) => {
            return {
                ...state,
                notify: '',
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

export const { getCommentsSuccess, commentsRequest, requestFailure, postCommentsRequest, postCommentsSuccess, setNotify } = commentsSlice.actions
export default commentsSlice.reducer