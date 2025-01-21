import React from "react";
import { Button, Table } from "react-bootstrap";

const ExpensesList = (props) => {
    return (
        <div>
            <Table hover striped style={{ borderBottom: "1px solid black", width: "50%", marginLeft: "30%", tableLayout: "fixed", textAlign: "left", fontFamily: "Bahnschrift Light" }}>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {props.expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>₹{expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                            <td><Button onClick={() => props.onEdit(expense.id)} variant="outline-dark" >Edit</Button></td>
                            <td><Button onClick={() => props.onDelete(expense.id)} variant="outline-dark" >Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ExpensesList;