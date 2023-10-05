import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customers: [],
    customer_detail: {},
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        customersRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        customersSuccess: (state, action) => {
            return {
                ...state,
                customers: action.payload,
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
        customerDetailRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        customerDetailSuccess: (state, action) => {
            return {
                ...state,
                customer_detail: action.payload,
                loading: false,
                error: null,
            }
        }

    }
})

export const { customersRequest, customersSuccess, requestFailure, customerDetailRequest, customerDetailSuccess } = authSlice.actions
export default authSlice.reducer