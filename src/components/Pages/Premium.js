import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../Store/redux";

const Premium = () => {
    const theme = useSelector(state => state.theme.theme);
    const expenses = useSelector(state => state.expenses.expenses);
    const dispatch = useDispatch();

    const toggleThemeHandler = () => {
        dispatch(themeActions.toggleTheme());
    };

    const downloadCSV = () => {
        const headers = ['ID', 'Amount', 'Description', 'Category'];

        const rows = expenses.map(expense => [
            expense.id,
            expense.amount,
            expense.description,
            expense.category
        ]);

        const csvContent = [
            headers.join(','), ...rows.map(row => row.join(','))
        ].join("\n");

    const blob = new Blob([ csvContent ], { type: 'text/csv;charser=utf-8;' });

        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "expenses.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s' }}>
            <Navbar className="header" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", backgroundColor: "gray", color: "whitesmoke" }}>
                <Button onClick={toggleThemeHandler} variant="outline-light">{theme === 'light' ? 'Dark Theme' : 'Light Theme'}</Button>
            </Navbar>
            <div style={{ marginTop: '5rem' }}>
                <Button onClick={downloadCSV} variant={theme === 'light' ? 'outline-dark' : 'outline-light'} >Download File</Button>
            </div>
        </div>
    )
};

export default Premium;