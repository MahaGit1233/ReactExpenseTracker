import React, { useContext, useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import AuthContext from "../Store/auth-context";
import './Expense.css';
import { NavLink } from "react-router-dom";
import AddExpenses from "./AddExpenses";
import ExpensesList from "./ExpensesList";

const Expense = () => {
    const authCtx = useContext(AuthContext);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const verificationHandler = (event) => {
        event.preventDefault();

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDZDlAptDzLh8R3jC0ZXi-3cbYAQrdt1o8', {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: authCtx.token,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.ok) {
                console.log('ok');
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data.email);
            setVerifyEmail(true);
            console.log(verifyEmail);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const addExpenseHandler = (expense) => {
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
    };

    return (
        <div>
            <Navbar className="header" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", backgroundColor: "gray", color: "whitesmoke" }}>
                <i style={{ marginLeft: "2%" }}>Welcome to Expense Tracker!</i>
                <div className="logout">
                    <div style={{ backgroundColor: "bisque", color: "black", borderRadius: "10px", padding: "7px", marginLeft: "-7%" }}>
                        <i>Your profile is incomplete. <NavLink to='/profile'>Complete Now</NavLink></i>
                    </div>
                    <Button variant="outline-light" onClick={authCtx.logout}>Logout</Button>
                </div>
            </Navbar>
            <div style={{ marginTop: "5rem", textAlign: "center" }}><h2>Add Expenses</h2></div>
            <AddExpenses onAddExpense={addExpenseHandler} />
            <div style={{marginTop:"5%"}}>
                <ExpensesList expenses={expenses} />
            </div>
            <div className="verifyBtn">
                <Button onClick={verificationHandler} variant="outline-dark">Verify EmailID</Button>
            </div>
        </div>
    )
};

export default Expense;