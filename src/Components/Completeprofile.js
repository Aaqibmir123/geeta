import React, { useContext, useRef } from 'react'
import { Expensescontext } from './store/Expensescontext';

export const Completeprofile = () => {
    const inputText = useRef();
    const inputFile = useRef();
    const ctx = useContext(Expensescontext);
    const tokens = localStorage.getItem('token');

    const getuserData = async () => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                idToken: tokens
            }),
            headers: {
                'Content-Type': 'application/json'
            },

        };
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w`, requestOptions);
        const data = await response.json();
        console.log(data);
        inputText.current.value = data.users[0].displayName;
        inputFile.current.value = data.users[0].photoUrl;

    }
    getuserData();

    const updateData = async () => {
        const enterName = inputText.current.value;
        const enterFile = inputFile.current.value;
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                idToken: tokens,
                displayName: enterName,
                photoUrl: enterFile,
            }),
            headers: {
                'Content-Type': 'application.json'
            },
        };

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w`, requestOptions);
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            ctx.updatedDatas(data.users);
        }
        else {
            throw new Error("something went wrong");
        }
    }

    return (
        <div>

            <input type='text' name='name' ref={inputText} />
            <input type='email' name='file' ref={inputFile} />
            <button onClick={updateData}>update</button>


        </div>
    )
}


