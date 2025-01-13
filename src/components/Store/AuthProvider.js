import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('token');

    const [token, setToken] = useState(initialToken);

    const loginHandler = (newToken) => {
        setToken(newToken);
        console.log(newToken);
        localStorage.setItem('token', newToken);
        console.log(!!token);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const authContext = {
        token: token,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;