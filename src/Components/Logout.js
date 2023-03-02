import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { Authcontent } from './store/Authcontext';
const Logout = () => {
    const Authctx = useContext(Authcontent);
    console.log(Authctx);
    const navigater = useNavigate();

    const logoutHandler = () => {
        Authctx.logout();
        navigater('/login');
    }

    return (
        <button onClick={logoutHandler}>logout</button>
    )
}

export default Logout