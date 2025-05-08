import React, { useState } from "react";
import './Signup.css';
import { Alert, Button, Card, Form } from "react-bootstrap";
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
            localStorage.setItem('email', enteredMail.replace(/[@.]/g, '_'));
            if (isLogin) {
                dispatch(authActions.login({ token: data.idToken, userId: data.localId }));
            }
            else {
                dispatch(authActions.signup({ token: data.idToken, userId: data.localId }));
            }
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
        <h1>Register</h1>
        <Form.Group>
            <Form.Label className="formlabel">Email Id:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="email" value={enteredMail} onChange={mailChangeHandler} placeholder="Enter your mail Id" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" value={enteredPass} onChange={passChangeHandler} placeholder="Enter Password" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Confirm Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" value={enteredConfirmPass} onChange={confirmPassChangeHandler} placeholder="Confirm your Password" />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="formBtn">
            <Button type="submit" variant="outline-dark">Sign Up</Button>
        </div>
    </Form>

    const login = <Form className="form1" onSubmit={formSubmitHandler}>
        <Form.Group>
            <Form.Label className="formlabel">Email Id:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="email" value={enteredMail} onChange={mailChangeHandler} placeholder="Enter your mail Id" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="formlabel">Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="password" value={enteredPass} onChange={passChangeHandler} placeholder="Enter your Password" />
        </Form.Group>
        <div className="formBtn">
            <div>
                <NavLink to="/forgot-password">Forgot Password</NavLink>
            </div>
            <Button type="submit" variant="outline-dark">Login</Button>
        </div>
    </Form>

    return (
        <Card className="card">
            <Card.Body className="cardbody">
                {!isLogin ? <div className="body">
                    <div className="bodyItems">
                        <h1>Welcome!</h1>
                        <h5>Sign up to create an account</h5>
                        <Button onClick={switchModeHandler} variant="outline-dark">{isLogin ? "Don't have an account? Sign up" : " Already have an account? Login"}</Button>
                    </div>
                </div> :
                    <div className="body1">
                        <div className="bodyItems1">
                            <h1>Welcome Back!</h1>
                            <h5>Log In to proceed to your account</h5>
                            <Button onClick={switchModeHandler} variant="outline-dark">{isLogin ? "Don't have an account? Sign up" : " Already have an account? Login"}</Button>
                        </div>
                    </div>}
                <div className="signupform">
                    {isLogin ? login : signup}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Signup;