import { createSlice } from "@reduxjs/toolkit";

const initialAuthSlice = { token: localStorage.getItem('token'), isAuthenticated: !!localStorage.getItem('token'), isLogin: true, userId: null };

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthSlice,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            localStorage.setItem('token', action.payload.token);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            localStorage.removeItem('token');
        },
        toggle(state) {
            state.isLogin = !state.isLogin;
        },
    }
});

export default authSlice;