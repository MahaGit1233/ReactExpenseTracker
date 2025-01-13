import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "./auth-context";

const Expense = () => {
    const authCtx=useContext(AuthContext);

    return (
        <div>
            <i>Welcome to Expense Tracker</i>
            <Button onClick={authCtx.logout} variant="outline-dark">Logout</Button>
        </div>
    )
};

export default Expense;