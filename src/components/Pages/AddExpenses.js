import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './AddExpenses.css';

const AddExpenses = (props) => {
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const amountHandler = (event) => {
        setEnteredAmount(event.target.value);
    }

    const descriptionHandler = (event) => {
        setEnteredDescription(event.target.value);
    }

    const optionsHandler = (event) => {
        setSelectedOption(event.target.value);
    }

    const addExpenseHandler = (event) => {
        event.preventDefault();

        const Expenses = {
            amount: enteredAmount,
            description: enteredDescription,
            category: selectedOption,
        };

        props.onAddExpense(Expenses);

        setEnteredAmount('');
        setEnteredDescription('');
        setSelectedOption('');
    }

    return (
        <div className="expensesform">
            <Form className="form">
                <Form.Group>
                    <Form.Label className="formlabel">Amount Spent:</Form.Label>
                    <Form.Control className="forminput" type="number" value={enteredAmount} onChange={amountHandler} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="formlabel">Description:</Form.Label>
                    <Form.Control className="forminput" type="text" value={enteredDescription} onChange={descriptionHandler} />
                </Form.Group>
                <Form.Group style={{ paddingBottom: "10px" }}>
                    <Form.Label className="formlabel">Category:</Form.Label>
                    <Form.Select className="forminput" value={selectedOption} onChange={optionsHandler} >
                        <option value=''>--Select Category--</option>
                        <option>Food</option>
                        <option>NewsPaper</option>
                        <option>Fuel</option>
                        <option>Electricity</option>
                        <option>Groceries</option>
                    </Form.Select>
                    <div className="formBtn">
                        <Button onClick={addExpenseHandler} variant="outline-dark">Add</Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddExpenses;