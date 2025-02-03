import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = { expenses: [], totalAmount: 0, isPremium: false };

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: initialExpensesState,
    reducers: {
        addExpense(state, action) {
            state.expenses.push(action.payload);
            state.totalAmount += Number(action.payload.amount);
        },
        setExpenses(state, action) {
            state.expenses = action.payload;
            state.totalAmount = action.payload.reduce((sum, exp) => sum + Number(exp.amount), 0);
        },
        deleteExpenses(state, action) {
            const expenseToDelete = state.expenses.find(exp => exp.id === action.payload);
            if (expenseToDelete) {
                state.totalAmount -= Number(expenseToDelete.amount);
            }
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
        },
        editExpenses(state, action) {
            const { id, updatedExpense } = action.payload;
            const existingExpense = state.expenses.find(expense => expense.id === id);
            if (existingExpense) {
                state.totalAmount = state.totalAmount - Number(existingExpense.amount) + Number(updatedExpense.amount);
                existingExpense.amount = updatedExpense.amount;
                existingExpense.description = updatedExpense.description;
                existingExpense.category = updatedExpense.category;
            }
        },
        activatePremium(state) {
            state.isPremium = true;
        }
    },
});

export default expensesSlice;