import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ForgotPassword = () => {
    const [enteredMail, setEnteredMail] = useState('');

    const mailChangeHandler = (event) => {
        setEnteredMail(event.target.value);
    }

    const forgotPasswordHandler = (event) => {
        event.preventDefault();

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDZDlAptDzLh8R3jC0ZXi-3cbYAQrdt1o8', {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: enteredMail,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res)=>{
            if (res.ok) {
                console.log('ok');
                return res.json();
            }
            else {
                return res.json().then((data)=>{
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data)=>{
            console.log(data.email);
        }).catch((err)=>{
            alert(err.message);
        })
    }

    return (
        <div className="signupform" style={{marginTop:"15%"}}>
            <Form className="form">
                <Form.Group>
                    <Form.Label className="formlabel" >Enter your email</Form.Label>
                    <Form.Control className="forminput" type="email" value={enteredMail} onChange={mailChangeHandler} />
                </Form.Group>
                <div className="formBtn">
                    <Button onClick={forgotPasswordHandler} variant="outline-dark">Send Link</Button>
                </div>
            </Form>
        </div>
    )
}

export default ForgotPassword;