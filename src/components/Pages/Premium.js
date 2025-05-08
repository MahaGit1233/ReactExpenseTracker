import React from "react";
import { Button, Card, CardBody, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './Premium.css'

const Premium = () => {
    const theme = useSelector(state => state.theme.theme);
    const expenses = useSelector(state => state.expenses.expenses);

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

        const blob = new Blob([csvContent], { type: 'text/csv;charser=utf-8;' });

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
        <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', height: '150vh', width: '100%', transition: 'all 2.0s', marginTop: '-10%' }}>
            <Navbar className="header" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", backgroundColor: "gray", color: "whitesmoke" }}>
                <NavLink to='/' style={{ color: 'white', textDecoration: 'none', fontSize: '30px', marginLeft: '1rem', marginTop: '-0.5rem' }}>←</NavLink>
            </Navbar>
            <div className="carddiv">
                <Card className="card" style={{ height: '40vh', width: '60%' }}>
                    <CardBody className="cardbody">
                        <div className="bodyItems" style={{ marginTop: '4%', marginRight: '20%', marginLeft: '2.8%', color: '#808000',fontFamily:'Lucida Calligraphy',fontSize:'19px' }}>
                            <p>Hey! You've been tracking your expenses  with us.</p>
                            <p>But wouldn't you like to see your total expenses?</p>
                            <p>Download your expense report now and take see!</p>
                        </div>
                        <div className="body1" style={{ marginLeft: '65%' }}>
                            <Button onClick={downloadCSV} style={{ marginLeft: '9%', marginTop: '30%' }} variant={theme === 'light' ? 'outline-dark' : 'outline-light'} >Download File</Button>
                        </div>
                    </CardBody>
                </Card >
            </div>
        </div>
    )
};

export default Premium;