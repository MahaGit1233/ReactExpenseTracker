import React, { useState } from "react";
import './Signup.css';
import { Alert, Button, Form } from "react-bootstrap";

const Signup = () => {
    const [enteredMail,setEnteredMail]=useState('');
    const [enteredPass,setEnteredPass]=useState('');
    const [enteredConfirmPass,setEnteredConfirmPass]=useState('');
    const [error,setError]=useState('');

    const mailChangeHandler=(event)=>{
        setEnteredMail(event.target.value);
    }

    const passChangeHandler=(event)=>{
        setEnteredPass(event.target.value);
    }

    const confirmPassChangeHandler=(event)=>{
        setEnteredConfirmPass(event.target.value);
    }

    const formSubmitHandler=(event)=>{
        event.preventDefault();

        if (!enteredMail||!enteredPass||!enteredConfirmPass){
            setError("All fields are required to be filled");
            return;
        }

        if (enteredPass!==enteredConfirmPass) {
            setError("Passwords do not match");
            return;
        }

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZDlAptDzLh8R3jC0ZXi-3cbYAQrdt1o8',{
            method: 'POST',
            body: JSON.stringify({
                email: enteredMail,
                password:enteredPass,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res=>{
            if(res.ok){
                console.log('User has successfully signed up');
                return res.json();
            }
            else {
                return res.json().then((data)=>{
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).catch((err)=>{
            console.log(err);
        })

        setEnteredMail('');
        setEnteredPass('');
        setEnteredConfirmPass('');
        setError('');
    }

    return (
        <div className="signupform" onSubmit={formSubmitHandler}>
            <Form className="form">
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
        </div>
    )
}

export default Signup;