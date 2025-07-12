import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Form } from "react-bootstrap";
import "./AddExpenses.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Backdrop = (props) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (props.editExpense) {
      setEnteredAmount(props.editExpense.amount);
      setEnteredDescription(props.editExpense.description);
      setSelectedOption(props.editExpense.category);
      setEnteredDate(props.editExpense.date);
    }
  }, [props.editExpense]);

  const amountHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const descriptionHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const dateHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const optionsHandler = (event) => {
    setSelectedOption(event.target.value);
  };

  const addExpenseHandler = (event) => {
    event.preventDefault();

    const Expenses = {
      id: props.editExpense?.id || undefined,
      amountSpent: enteredAmount,
      description: enteredDescription,
      category: selectedOption,
      date: enteredDate,
    };
    if (
      enteredAmount.length === 0 ||
      enteredDescription.length === 0 ||
      selectedOption.length === 0
    ) {
      alert("Please fill all the fields");
    } else {
      props.onAddExpense(Expenses);
    }

    setEnteredAmount("");
    setEnteredDescription("");
    setSelectedOption("");
    setEnteredDate("");
    props.setEditExpense(null);
  };

  return (
    <div className="backdrop">
      <div className="expensesform1">
        <Form className="form">
          <Form.Group>
            <Form.Label className="formlabel">Amount Spent:</Form.Label>
            <Form.Control
              style={{ backgroundColor: "#efebeb" }}
              placeholder="Enter amount"
              className="forminput"
              type="number"
              value={enteredAmount}
              onChange={amountHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="formlabel">Description:</Form.Label>
            <Form.Control
              style={{ backgroundColor: "#efebeb" }}
              placeholder="Describe your expense"
              className="forminput"
              as="textarea"
              rows={2}
              value={enteredDescription}
              onChange={descriptionHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="formlabel">Date:</Form.Label>
            <Form.Control
              style={{ backgroundColor: "#efebeb" }}
              className="forminput"
              type="date"
              value={enteredDate}
              onChange={dateHandler}
            />
          </Form.Group>
          <Form.Group style={{ paddingBottom: "10px" }}>
            <Form.Label className="formlabel">Category:</Form.Label>
            <Form.Select
              style={{ backgroundColor: "#efebeb" }}
              className="forminput"
              value={selectedOption}
              onChange={optionsHandler}
            >
              <option value="">--Select Category--</option>
              <option>Food</option>
              <option>Clothes</option>
              <option>Fuel</option>
              <option>Electricity</option>
              <option>Groceries</option>
            </Form.Select>
          </Form.Group>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "5%",
              paddingBottom: "10px",
            }}
          >
            <Button onClick={addExpenseHandler} variant="outline-dark">
              {props.editExpense ? "UPDATE" : "Add"}
            </Button>
            <Button onClick={props.onClose} variant="outline-dark">
              Close
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const AddExpenses = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          editExpense={props.editExpense}
          onClose={props.onClose}
          onAddExpense={props.onAddExpense}
          setEditExpense={props.setEditExpense}
        />,
        document.getElementById("backdrop-root")
      )}
    </React.Fragment>
  );
};

export default AddExpenses;
