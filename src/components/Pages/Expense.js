import React, { useCallback, useEffect, useState } from "react";
import { Button, Image, Navbar } from "react-bootstrap";
import "./Expense.css";
import { NavLink } from "react-router-dom";
import AddExpenses from "./AddExpenses";
import ExpensesList from "./ExpensesList";
import { useDispatch, useSelector } from "react-redux";
import { authActions, expensesActions, themeActions } from "../Store/redux";

const Expense = () => {
  const [editExpense, setEditExpense] = useState(null);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const isPremium = useSelector((state) => state.expenses.isPremium);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const theme = useSelector((state) => state.theme.theme);
  const photoUrl = isLogin
    ? localStorage.getItem("photoUrl")
    : "https://i.pinimg.com/736x/be/94/e6/be94e6323f277445d135d5025c0d41d2.jpg";

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const showExpenseFormHandler = () => {
    setShowExpenseForm(true);
  };

  const closeHandler = () => {
    setShowExpenseForm(false);
  };

  console.log(localStorage.getItem("email"));
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    console.log(storedEmail);
    fetch(`http://localhost:4000/expenses/get/${storedEmail}`, {
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
        console.log(data);
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
        console.log(err.message);
      });
  }, [dispatch]);

  const verificationHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("ok");
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error.message);
            console.log(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data.email);
        setVerifyEmail(true);
        console.log(verifyEmail);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addExpenseHandler = useCallback(
    async (expense) => {
      if (editExpense) {
        setShowExpenseForm(false);
        const response = await fetch(
          `http://localhost:4000/expenses/update/${storedEmail}/${editExpense.id}`,
          {
            method: "PUT",
            body: JSON.stringify(expense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          dispatch(expensesActions.editExpenses(expense));
          setEditExpense(null);
        }
      } else {
        setShowExpenseForm(false);
        const response = await fetch(
          `http://localhost:4000/expenses/add/${storedEmail}`,
          {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        dispatch(expensesActions.addExpense({ id: data.id, ...expense }));
      }
    },
    [editExpense]
  );

  const deleteHandler = async (id) => {
    const response = await fetch(
      `http://localhost:4000/expenses/delete/${storedEmail}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("Expense successfully deleted");
    }
    dispatch(expensesActions.deleteExpenses(id));
  };

  const editHandler = (expense) => {
    setEditExpense(expense);
    setShowExpenseForm(true);
  };

  useEffect(() => {
    if (totalAmount > 10000 && !isPremium) {
      dispatch(expensesActions.activatePremium());
    }
  }, [totalAmount, dispatch, isPremium]);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        transition: "all 1.0s",
        height: "150vh",
        width: "100%",
      }}
    >
      <Navbar
        className={
          theme === "light"
            ? "bg-secondary justify-content-between"
            : "bg-body-tertiary justify-content-between"
        }
        style={{
          transition: "all 1.0s",
          display: "flex",
          justifyContent: "space-between",
        }}
        fixed="top"
      >
        <i
          style={{
            marginLeft: "2%",
            color: theme === "light" ? "white" : "black",
          }}
        >
          Welcome to Expense Tracker!
        </i>
        <div style={{ marginRight: "-13%", display: "flex", gap: "3%" }}>
          <div style={{ marginTop: "1%" }}>
            <Button
              onClick={verificationHandler}
              variant={theme === "light" ? "outline-light" : "outline-dark"}
            >
              Verify EmailID
            </Button>
          </div>
          {totalAmount > 10000 && isPremium && (
            <NavLink style={{ marginTop: "1%" }} to="/premium">
              <Button
                variant={theme === "light" ? "outline-light" : "outline-dark"}
              >
                Activate Premium
              </Button>
            </NavLink>
          )}
          <Button
            variant={theme === "light" ? "outline-light" : "outline-dark"}
            style={{
              marginTop: "2%",
              marginBottom: "2%",
              borderRadius: "17px",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
            onClick={toggleThemeHandler}
          >
            {theme === "light" ? "˚☽˚.⋆" : " ☀︎ "}
          </Button>
          <div style={{ marginTop: "2.5%" }}>
            <Button
              variant={theme === "light" ? "outline-light" : "outline-dark"}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
          <NavLink to="/profile">
            <Image
              style={{ width: "20%", height: "80%", marginTop: "2.5%" }}
              src={photoUrl}
              roundedCircle
            />
          </NavLink>
        </div>
      </Navbar>
      <Button
        onClick={showExpenseFormHandler}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          border: "none",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "2rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          transition: "background 0.35",
        }}
        variant={theme === "light" ? "dark" : "light"}
      >
        +
      </Button>
      {showExpenseForm && (
        <AddExpenses
          onAddExpense={addExpenseHandler}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
          onClose={closeHandler}
        />
      )}
      <div style={{ marginTop: "1%" }}>
        <ExpensesList
          onDelete={deleteHandler}
          onEdit={editHandler}
          expenses={expenses}
        />
      </div>
    </div>
  );
};

export default Expense;
