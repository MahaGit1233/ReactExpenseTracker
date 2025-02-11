import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './ProfileForm.css';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileForm = () => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredURL, setEnteredURL] = useState('');

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw', {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if (res.ok) {
                console.log(res.users);
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data.users);
            const user = data.users[0];
            setEnteredName(user.displayName);
            setEnteredURL(user.photoUrl);
            console.log(enteredName);
            console.log(enteredURL);
        }).catch(err => {
            console.log(err);
        })
    }, [token]);

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const urlChangeHandler = (event) => {
        setEnteredURL(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw', {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                displayName: enteredName,
                photoUrl: enteredURL,
                deleteAttribute: [],
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
        });

        setEnteredName('');
        setEnteredURL('');
    };

    return (
        <div className="profile">
            <h2 style={{ textAlign: "center" }}>Profile</h2>
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
                    <div className="formBtn" style={{ display: "flex", gap: "3%" }}>
                        <Button type="submit" variant="outline-dark" >Update</Button>
                        <NavLink to="/"><Button variant="outline-dark" >Close</Button></NavLink>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default ProfileForm;