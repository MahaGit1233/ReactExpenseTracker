import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import AuthContext from "../Store/auth-context";
import './Expense.css';
import { NavLink } from "react-router-dom";
import AddExpenses from "./AddExpenses";
import ExpensesList from "./ExpensesList";
import { useDispatch, useSelector } from "react-redux";
import { authActions, expensesActions } from "../Store/redux";

const Expense = () => {
    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const expenses = useSelector(state => state.expenses.expenses);
    const totalAmount = useSelector(state => state.expenses.totalAmount);
    const isPremium = useSelector(state => state.expenses.isPremium);

    const logoutHandler = () => {
        dispatch(authActions.logout())
    }

    const [verifyEmail, setVerifyEmail] = useState(false);
    // const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch("https://react-expensetracker-f81a3-default-rtdb.firebaseio.com/expensetracker.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch expenses");
                }
                return res.json();
            })
            .then((data) => {
                const loadedExpenses = [];
                for (const key in data) {
                    loadedExpenses.push({
                        id: key,
                        ...data[key],
                    });
                }
                dispatch(expensesActions.setExpenses(loadedExpenses));
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [dispatch])

    const verificationHandler = (event) => {
        event.preventDefault();

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw', {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: token,
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

    const addExpenseHandler = useCallback(async (expense) => {
        const response = await fetch('https://react-expensetracker-f81a3-default-rtdb.firebaseio.com/expensetracker.json', {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        dispatch(expensesActions.addExpense({ id: data.name, ...expense }))
        // const expenseWithId = { id: data.name, ...expense };
        // setExpenses((prevExpenses) => [...prevExpenses, expenseWithId]);
    }, []);

    const deleteHandler = async (id) => {
        const response = await fetch(`https://react-expensetracker-f81a3-default-rtdb.firebaseio.com/expensetracker/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            console.log('Expense successfully deleted');
        }
        dispatch(expensesActions.deleteExpenses(id));
        // setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    };

    const editHandler = async (id) => {
        const updatedAmount = prompt('Enter new Amount:');
        const updatedDescription = prompt('Enter new Description:');
        const updatedCategory = prompt('Enter new Category:');

        const updatedExpense = {
            amount: updatedAmount,
            description: updatedDescription,
            category: updatedCategory,
        };

        const response = await fetch(`https://react-expensetracker-f81a3-default-rtdb.firebaseio.com/expensetracker/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(updatedExpense),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            dispatch(expensesActions.editExpenses({ id, updatedExpense }));
            // setExpenses((prevExpenses) => prevExpenses.map((expense) => expense.id === id ? { id, ...updatedExpense } : expense));
        }
    }

    useEffect(() => {
        if (totalAmount > 10000 && !isPremium) {
            dispatch(expensesActions.activatePremium());
        }
    }, [totalAmount, dispatch, isPremium]);

    return (
        <div>
            <Navbar className="header" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", backgroundColor: "gray", color: "whitesmoke" }}>
                <i style={{ marginLeft: "2%" }}>Welcome to Expense Tracker!</i>
                <div className="logout">
                    <div style={{ backgroundColor: "bisque", color: "black", borderRadius: "10px", padding: "7px", marginLeft: "-7%" }}>
                        <i>Your profile is incomplete. <NavLink to='/profile'>Complete Now</NavLink></i>
                    </div>
                    <Button variant="outline-light" onClick={logoutHandler}>Logout</Button>
                </div>
            </Navbar>
            <div style={{ marginTop: "10rem", textAlign: "center" }}><h2>Add Expenses</h2></div>
            <AddExpenses onAddExpense={addExpenseHandler} />
            <div style={{ marginTop: "5%" }}>
                <ExpensesList onDelete={deleteHandler} onEdit={editHandler} expenses={expenses} />
            </div>
            {totalAmount > 10000 && isPremium && (
                <div className="verifyBtn" style={{ textAlign: "center" }}>
                    <NavLink to='/premium'><Button variant="outline-dark" >Activate Premium</Button></NavLink>
                </div>
            )}
            <div className="verifyBtn" style={{ textAlign: "center" }}>
                <Button onClick={verificationHandler} variant="outline-dark">Verify EmailID</Button>
            </div>
        </div>
    )
};

export default Expense;