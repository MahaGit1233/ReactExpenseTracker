import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Expense from './Expense';
import { Provider } from 'react-redux';
import store from '../Store/redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Expense Component', () => {
    test('should show login form after logging out', () => {
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const logoutElement = screen.getByRole('button', { name: 'Logout' });
        userEvent.click(logoutElement);

        const outputElement = screen.queryByText('Email Id:');
        expect(outputElement).toBeNull();
    });

    test('renders welcome', () => {
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const welcomeElement = screen.getByText('Welcome to Expense Tracker!');
        expect(welcomeElement).toBeInTheDocument();
    });

    test('renders profile incompletion', () => {
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const incompleteElement = screen.getByText('Your profile is incomplete.');
        expect(incompleteElement).toBeInTheDocument();
    });

    test('renders profile completion', () => {
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const completeElement = screen.getByText('Complete Now');
        expect(completeElement).toBeInTheDocument();
    });

    test('renders add expenses', () => {
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const addExpensesElement = screen.getByText('Add Expenses');
        expect(addExpensesElement).toBeInTheDocument();
    });
});