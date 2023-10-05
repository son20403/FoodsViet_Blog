import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showNavbar: false,
    showSetting: false,
    showSearch: false
}
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        toggleNavbar: (state,) => {
            return {
                ...state,
                showNavbar: !state.showNavbar
            }
        },
        toggleSetting: (state) => {
            return {
                ...state,
                showSetting: !state.showSetting
            }
        },
        toggleSearch: (state) => {
            return {
                ...state,
                showSearch: !state.showSearch
            }
        },
        closeNavbar: (state,) => {
            return {
                ...state,
                showNavbar: false
            }
        },
        closeSetting: (state) => {
            return {
                ...state,
                showSetting: false
            }
        },
        closeSearch: (state) => {
            return {
                ...state,
                showSearch: false
            }
        },
    }
})

export const { toggleNavbar, toggleSearch, toggleSetting, closeNavbar, closeSearch, closeSetting } = globalSlice.actions;
export default globalSlice.reducer