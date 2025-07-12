import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ExpenseList.css";

const ExpensesList = (props) => {
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const theme = useSelector((state) => state.theme.theme);

  const categoryLogo = {
    Food: "🌮",
    Fuel: "⛽️",
    Electricity: "⚡",
    Clothes: "👚",
    Groceries: "🥬",
  };

  return (
    <div className="expslist">
      <h1
        style={{
          fontFamily: "Bahnschrift Light",
          color: theme === "light" ? "black" : "white",
          textAlign: "center",
        }}
      >
        Track Your Expenses
      </h1>
      <div className={theme === "light" ? "total" : "total1"}>
        ₹<div>{totalAmount.toLocaleString()}</div>
        <div className="inr">INR</div>
      </div>
      <div style={{ marginLeft: "20rem" }}>
        {props.expenses.map((expense) => {
          const Category = categoryLogo[expense.category];
          return (
            <li key={expense.id} className="list">
              <div className="cat">{Category}</div>
              <div className="expdetails">
                <div className="des">{expense.description}</div>
                <div className="date">{expense.date.toLocaleString()}</div>
                <div className="amount">₹{expense.amountSpent}</div>
              </div>
              <div>
                <Button
                  style={{ border: "none", fontSize: "30px" }}
                  className="editbtn"
                  onClick={() => props.onEdit(expense)}
                  variant="outline-dark"
                >
                  🖋
                </Button>
              </div>
              <div>
                <Button
                  style={{ border: "none", fontSize: "30px" }}
                  className="delbtn"
                  onClick={() => props.onDelete(expense.id)}
                  variant="outline-dark"
                >
                  🗑
                </Button>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default ExpensesList;
