import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AuthContext from "../Store/auth-context";
import './ProfileForm.css';

const ProfileForm = () => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredURL, setEnteredURL] = useState('');

    const authCtx = useContext(AuthContext);

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const urlChangeHandler = (event) => {
        setEnteredURL(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDZDlAptDzLh8R3jC0ZXi-3cbYAQrdt1o8', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                displayName: enteredName,
                photoUrl: enteredURL,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (res.ok) {
                console.log('ok');
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data);
            console.log(data.idToken);
        }).catch((err) => {
            alert(err.message);
        })

        setEnteredName('');
        setEnteredURL('');
    };

    return (
        <div className="profile">
            <h2 style={{textAlign:"center"}}>Profile</h2>
            <div className="signupform">
                <Form className="form" onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label className="formlabel">Full Name</Form.Label>
                        <Form.Control className="forminput" type="text" value={enteredName} onChange={nameChangeHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="formlabel">Profile Photo URL</Form.Label>
                        <Form.Control className="forminput" type="url" value={enteredURL} onChange={urlChangeHandler} />
                    </Form.Group>
                    <div className="formBtn" style={{display:"flex", gap:"3%"}}>
                        <Button type="submit" variant="outline-dark" >Update</Button>
                        <Button variant="outline-dark" >Close</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default ProfileForm;