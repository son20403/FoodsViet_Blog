import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false,
    error: null,
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
        getCommentsSuccess: (state, action) => {
            return {
                ...state,
                comments: action.payload,
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

export const { getCommentsSuccess, commentsRequest, requestFailure } = commentsSlice.actions
export default commentsSlice.reducer