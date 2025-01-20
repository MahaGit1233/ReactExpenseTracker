import React from "react";
import { Table } from "react-bootstrap";

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
                        <tr>
                            <td>₹{expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ExpensesList;