import React, { useContext } from "react";
import { Button, Navbar } from "react-bootstrap";
import AuthContext from "../Store/auth-context";
import './Expense.css';
import { NavLink } from "react-router-dom";

const Expense = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div>
            <Navbar className="header" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", backgroundColor: "gray", color: "whitesmoke" }}>
                <i style={{ marginLeft: "2%" }}>Welcome to Expense Tracker</i>
                <div>
                    <div style={{backgroundColor:"bisque", color:"black", borderRadius:"10px",padding:"7px"}}>
                        <i>Your profile is incomplete. <NavLink to='/profile'>Complete Now</NavLink></i>
                    </div>
                    <Button onClick={authCtx.logout}>Logout</Button>
                </div>
            </Navbar>
        </div>
    )
};

export default Expense;