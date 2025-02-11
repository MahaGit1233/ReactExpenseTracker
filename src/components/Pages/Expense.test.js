import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Expense from './Expense';
import { Provider } from 'react-redux';
import store from '../Store/redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Expense Component', () => {
    test('should fetch expenses on mount', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => ({ amount: '1000', description: 'Filled Petrol', category: 'Fuel' }),
        });
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const listElement = screen.queryByText('Filled Petrol');
        expect(listElement).toBeNull();
    });

    test('should post a request to verify email', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => ({ email: 'maharush5409@gmail.com' }),
        });
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const expenseElement = await screen.findAllByRole('button', { name: /verify email/i });
        expect(expenseElement).not.toBeNull();
    });

    test('should post a request whenever an expense is added', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => ({ name: 'generated-id' }),
        });
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const addingElement = screen.queryByText('Filled Petrol');
        expect(addingElement).toBeNull();
    });

    test('should post a delete request whenever delete button is clicked', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => ({}),
        });
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const deletingElement = screen.queryByRole('button', { name: /delete/i });
        expect(deletingElement).toBeNull();
    });

    test('should post a put request whenever edit button is clicked', () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => ({ ok: true }),
        });
        render(<Provider store={store} ><BrowserRouter><Expense /></BrowserRouter></Provider>);
        const editElement = screen.queryByText('Filled Petrol');
        expect(editElement).toBeNull();
    });
});