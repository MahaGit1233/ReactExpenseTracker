import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (newToken) => { },
    logout: () => { },
});

export default AuthContext;