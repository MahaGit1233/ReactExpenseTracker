import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

test('renders profile', () => {
    render(<BrowserRouter><ProfileForm /></BrowserRouter>);
    const profileElement = screen.getByText('Profile');
    expect(profileElement).toBeInTheDocument();
});