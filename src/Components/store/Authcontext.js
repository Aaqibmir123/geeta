import React, { useState } from 'react'
import { createContext } from 'react';
import { Login } from '../Login';

export const Authcontent = React.createContext({
    token: "",
    islogined: false,
    login: (token) => { },
    logout: () => { },
    email: ''

});


export const Authcontextprovider = (props) => {
    const [token, settoken] = useState(null);
    const [email, setemail] = useState('');
    const userislogined = !!token;

    const loginhandler = (token) => {
        settoken(token);
        setemail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);

    }
    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        settoken(null);
        setemail(null);
        console.log('logout handler')

    }
    const contextvalue = {
        token: token,
        islogined: userislogined,
        login: loginhandler,
        logout: logoutHandler,

    }

    return (
        <Authcontent.Provider value={contextvalue}>
            {props.children}
        </Authcontent.Provider>
    )
}
