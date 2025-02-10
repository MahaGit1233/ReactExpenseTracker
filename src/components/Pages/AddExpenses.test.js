import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AddExpenses from './AddExpenses';
import userEvent from '@testing-library/user-event';

test('adds expenses below whenever Add button is clicked', () => {
    render(<AddExpenses />);
    const addElement = screen.getByRole('button', { name: 'Add' });
    userEvent.click(addElement);

    const outputElement = screen.queryByText('Amount');
    expect(outputElement).toBeNull();
});