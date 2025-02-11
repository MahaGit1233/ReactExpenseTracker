import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react"
import Signup from "./Signup"
import { Provider } from "react-redux";
import store from "../Store/redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

describe('Signup Component', () => {
    test('should submit sign up form and navigate to Expense component', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ email: 'maharush5409@gmail.com', password: '789456' }],
        });
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const expenseElement = screen.queryByText('Add Expenses');
        expect(expenseElement).toBeNull();
    });

    test('should submit login form and navigate to Expense component', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ email: 'maharush5409@gmail.com', password: '789456' }],
        });
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const expenseElement = screen.queryByText('Add Expenses');
        expect(expenseElement).toBeNull();
    });

    test('renders Expenses component when clicked on sign up button', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const expensesElement = screen.getByRole('button', { name: /sign up/i });
        userEvent.click(expensesElement);

        const outputElement = screen.queryByText('Add Expenses');
        expect(outputElement).toBeNull();
    });

    test('renders Expenses component when clicked on Login button', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const expensesElement = screen.getByRole('button', { name: /sign up/i });
        userEvent.click(expensesElement);

        const outputElement = screen.queryByText('Add Expenses');
        expect(outputElement).toBeNull();
    });

    test('should render signup form when clicked on "Dont have an account? sign up" button', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const checkingElement = screen.getByRole('button', { name: "Don't have an account? Sign up" });
        userEvent.click(checkingElement);

        const outputElement = screen.queryByText('Email Id:');
        expect(outputElement).not.toBeNull();
    });

    test('renders Email id', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const mailElement = screen.getByText('Email Id:');
        expect(mailElement).toBeInTheDocument();
    });

    test('renders password', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const passwordElement = screen.getByText('Password:');
        expect(passwordElement).toBeInTheDocument();
    });

    test('renders forgot password text', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const forgotPasswordElement = screen.getByText('Forgot Password');
        expect(forgotPasswordElement).toBeInTheDocument();
    });
});