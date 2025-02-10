import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Premium from './Premium';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../Store/redux';
import { BrowserRouter } from 'react-router-dom';

test('renders download the file text', () => {
    render(<Provider store={store}><BrowserRouter><Premium /></BrowserRouter></Provider>);
    const downloadElement = screen.getByRole('button', { name: 'Download File' });
    userEvent.click(downloadElement);

    const outputElement = screen.queryByText('Download the File');
    expect(outputElement).not.toBeNull();
});