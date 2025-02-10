import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ExpensesList from './ExpensesList';

describe('Expenses List Component', () => {
    test('renders amount of the expense', () => {
        render(<ExpensesList expenses={[]} onEdit={() => { }} onDelete={() => { }} />);
        const amountElement = screen.getByText('Amount');
        expect(amountElement).toBeInTheDocument();
    });

    test('renders amount of the expense', () => {
        render(<ExpensesList expenses={[]} onEdit={() => { }} onDelete={() => { }} />);
        const descriptionElement = screen.getByText('Description');
        expect(descriptionElement).toBeInTheDocument();
    });

    test('renders amount of the expense', () => {
        render(<ExpensesList expenses={[]} onEdit={() => { }} onDelete={() => { }} />);
        const categoryElement = screen.getByText('Category');
        expect(categoryElement).toBeInTheDocument();
    });
});