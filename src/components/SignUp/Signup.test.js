import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react"
import Signup from "./Signup"
import { Provider } from "react-redux";
import store from "../Store/redux";
import { BrowserRouter } from "react-router-dom";

describe('Signup Component', () => {
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

    test('renders forgot password', () => {
        render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);
        const forgotPasswordElement = screen.getByText('Forgot Password');
        expect(forgotPasswordElement).toBeInTheDocument();
    });
});