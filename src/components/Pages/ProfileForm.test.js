import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';

describe('Profile component', () => {
    test('renders profile', () => {
        render(<BrowserRouter><ProfileForm /></BrowserRouter>);
        const profileElement = screen.getByText('Profile');
        expect(profileElement).toBeInTheDocument();
    });

    test('should render Expense component when you click on close', () => {
        render(<BrowserRouter><ProfileForm /></BrowserRouter>);
        const closeElement = screen.getByRole('button', { name: 'Close' });
        userEvent.click(closeElement);

        const outputElement = screen.queryByText("Welcome to Expense Tracker!");
        expect(outputElement).toBeNull();
    });
});