import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth";
import expensesSlice from "./Expenses";
import themeSlice from "./Theme";

const store = configureStore({
    reducer: { auth: authSlice.reducer, expenses: expensesSlice.reducer, theme: themeSlice.reducer }
});

export const authActions = authSlice.actions;
export const expensesActions = expensesSlice.actions;
export const themeActions = themeSlice.actions;

export default store;