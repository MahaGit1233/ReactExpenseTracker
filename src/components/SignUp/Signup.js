import React, { useContext, useState } from "react";
import './Signup.css';
import { Alert, Button, Form } from "react-bootstrap";
import AuthContext from "../Store/auth-context";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/redux";

const Signup = () => {
    const [enteredMail, setEnteredMail] = useState('');
    const [enteredPass, setEnteredPass] = useState('');
    const [enteredConfirmPass, setEnteredConfirmPass] = useState('');
    const [error, setError] = useState('');
    // const [isLogin, setIsLogin] = useState(true);
    // const authCtx = useContext(AuthContext);

    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();

    const url = isLogin ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw';

    const switchModeHandler = () => {
        dispatch(authActions.toggle());
    }

    const mailChangeHandler = (event) => {
        setEnteredMail(event.target.value);
    };

    const passChangeHandler = (event) => {
        setEnteredPass(event.target.value);
    };

    const confirmPassChangeHandler = (event) => {
        setEnteredConfirmPass(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (!enteredMail || !enteredPass) {
            setError("All fields are required to be filled");
            return;
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredMail,
                password: enteredPass,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok) {
                console.log('User has successfully signed up');
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            dispatch(authActions.login({token: data.idToken, userId: data.localId}));
            // authCtx.login(data.idToken);
            console.log(data);
        }).catch((err) => {
            alert(err.message);
        });

        setEnteredMail('');
        setEnteredPass('');
        setEnteredConfirmPass('');
        setError('');
    };

    const signup = <Form className="form" onSubmit={formSubmitHandler}>
        <Form.Group>
            <Form.Label className="formlabel">Email Id:</Form.Label>
            <Form.Control className="forminput" type="email" value={enteredMail} onChange={mailChangeHandler} />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Password:</Form.Label>
            <Form.Control className="forminput" type="password" value={enteredPass} onChange={passChangeHandler} />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Confirm Password:</Form.Label>
            <Form.Control className="forminput" type="password" value={enteredConfirmPass} onChange={confirmPassChangeHandler} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="formBtn">
            <Button type="submit" variant="outline-dark">Sign Up</Button>
        </div>
    </Form>

    const login = <Form className="form" onSubmit={formSubmitHandler}>
        <Form.Group>
            <Form.Label className="formlabel">Email Id:</Form.Label>
            <Form.Control className="forminput" type="email" value={enteredMail} onChange={mailChangeHandler} />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Password:</Form.Label>
            <Form.Control className="forminput" type="password" value={enteredPass} onChange={passChangeHandler} />
        </Form.Group>
        <div className="formBtn">
            <Button type="submit" variant="outline-dark">Login</Button>
            <div>
                <NavLink to="/forgot-password">Forgot Password</NavLink>
            </div>
        </div>
    </Form>

    return (
        <div>
            <div className="signupform">
                {isLogin ? login : signup}
            </div>
            <div>
                <Button onClick={switchModeHandler} style={{ marginTop: "5%" }} variant="outline-dark">{isLogin ? "Don't have an account? Sign up" : "Have an account? Login"}</Button>
            </div>
        </div>
    );
};

export default Signup;