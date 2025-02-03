import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { theme: 'light' };

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    },
});

export default themeSlice;