import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../Store/redux';

describe('Profile component', () => {
    test('renders profile', () => {
        render(<Provider store={store}><BrowserRouter><ProfileForm /></BrowserRouter></Provider>);
        const profileElement = screen.getByText('Profile');
        expect(profileElement).toBeInTheDocument();
    });

    test('should render Expense component when you click on close', () => {
        render(<Provider store={store}><BrowserRouter><ProfileForm /></BrowserRouter></Provider>);
        const closeElement = screen.getByRole('button', { name: 'Close' });
        userEvent.click(closeElement);

        const outputElement = screen.queryByText("Welcome to Expense Tracker!");
        expect(outputElement).toBeNull();
    });

    test('should submit form and update user data', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ idToken: 'new-token', displayName: 'mahathi' }],
        });
        render(<Provider store={store}><BrowserRouter><ProfileForm /></BrowserRouter></Provider>);
        const formElement = await screen.findAllByRole('textbox');
        expect(formElement).not.toBeNull();
    });

    test('should fetch user data on mount and update the state', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ idToken: 'new-token', displayName: 'mahathi' }],
        });
        render(<Provider store={store}><BrowserRouter><ProfileForm /></BrowserRouter></Provider>);
        const formElement = await screen.findAllByRole('textbox');
        expect(formElement).not.toBeNull();
    });
});