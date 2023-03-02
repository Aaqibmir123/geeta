import React, { useRef } from 'react'
import { useState } from 'react';
import { Login } from './Login';
import './style.css';
const Signup = () => {
  
    const [isLoading,setloading] = useState(false);  

    const inputEmailref = useRef();
    const inputpasswordref = useRef();
    const inputconfirmpasswordref = useRef();

    // const handleChnage = (e) => {
    //     const Value = e.target.value;
    //     setuser({
    //         ...user, [e.target.name]: Value
    //     })
    // }

    const submithandler = (e) => {
        e.preventDefault();
        const enteremail = inputEmailref.current.value;
        const enterpassword = inputpasswordref.current.value;
        const enterconfirmpassword = inputconfirmpasswordref.current.value;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w';
       setloading(true);
        if (enterpassword === enterconfirmpassword) {
           
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteremail,
                    password: enterpassword,
                    cofirm_password: enterconfirmpassword,
                    returnSecureToken: true
                }),

                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                setloading(false);
                if (res.ok) {
                    alert("stored succwssfully");
                    setloading(false);
                    
                }
                else {
                    return res.json().then(data => {

                        //set error message
                        let errorMessage = "failed";
                            if(data && data.error && data.error.message){
                                errorMessage = data.error.message;
                            }
                            alert(errorMessage);
                       
                    })
                }
            })
        } else {
            alert('wrong password')
        }




    }

    return (
        <>
            <form onSubmit={submithandler} id="form">
                <input type='email' placeholder="Enter Email"
                    ref={inputEmailref} required />
                <input type='password' placeholder='Enter Password'
                    ref={inputpasswordref} required />
                <input type='password' placeholder='Confirm_password'
                    ref={inputconfirmpasswordref} required />
               {!isLoading &&  <button className='btn'>Signup</button>}
               {isLoading && <p>isLoading ....</p>}
            </form>
            <Login />
        </>
    )
}

export default Signup