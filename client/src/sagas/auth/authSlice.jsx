import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        loginSuccess: (state, action) => {
            localStorage.setItem('authToken', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            }
        },
        logout: (state) => {
            localStorage.removeItem('authToken')
            return {
                ...state,
                isAuthenticated: false,
                token: null,
            }
        },
        registerRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess: (state) => {
            return {
                ...state,
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
        refreshAccessTokenRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        refreshAccessTokenSuccess: (state, action) => {
            localStorage.setItem('authToken', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            }
        },
    }
})

export const { loginRequest, loginSuccess, logout, registerRequest, requestFailure, registerSuccess, refreshAccessTokenRequest, refreshAccessTokenSuccess } = authSlice.actions
export default authSlice.reducer