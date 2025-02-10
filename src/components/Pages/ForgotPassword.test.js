import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

test('should send verification link when clicked on send link button', () => {
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    const sendLinkElement = screen.getByRole('button', { name: 'Send Link' });
    userEvent.click(sendLinkElement);

    const outputElement = screen.queryByText('Enter your email');
    expect(outputElement).not.toBeNull();
})