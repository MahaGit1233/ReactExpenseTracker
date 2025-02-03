import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth";
import expensesSlice from "./Expenses";

const store = configureStore({
    reducer: { auth: authSlice.reducer, expenses: expensesSlice.reducer }
});

export const authActions = authSlice.actions;
export const expensesActions = expensesSlice.actions;

export default store;