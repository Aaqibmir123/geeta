import React, { useContext, useRef, useState } from "react";
import { Authcontent } from "./store/Authcontext";
import { useNavigate } from "react-router";
import "./style.css";
export const Login = () => {
  const navigation = useNavigate();
  const ctx = useContext(Authcontent);

  const logined = ctx.islogined;
  const [email, SetEmail] = useState();
  const updateEmail = (e) => {
    SetEmail(e.target.value);
  };

  const inputEmailref = useRef();
  const inputpasswordref = useRef();
  const emails = localStorage.getItem("email");

  //forget password

  const ForgetPasswordHandler = async () => {
    const requestOptins = {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: "miraaqib514@gmail.com",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w`,
      requestOptins
    );
    const data = await response.json();
    console.log(data);
  };

  const submithandler = (e) => {
    e.preventDefault();
    const enteremail = inputEmailref.current.value;
    const enterpassword = inputpasswordref.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteremail,
        password: enterpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => {
        if (res.ok) {
          navigation("/welcome");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessaege = data.error.message;
            console.log(errorMessaege);
            throw new Error(errorMessaege);
          });
        }
      })
      .then((data) => {
        console.log("email", data.email);
        ctx.login(data.idToken, data.email);
        localStorage.setItem("email", email);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div>
        <form id="form" onSubmit={submithandler}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="email"
            ref={inputEmailref}
            onChange={updateEmail}
          />
          <input
            type="password"
            placeholder="password"
            ref={inputpasswordref}
          />
          {!logined && <button className="btn">Login</button>}
          <button onClick={ForgetPasswordHandler} className="btn-forget">
            Forget password
          </button>
          <br />
        </form>
      </div>
    </>
  );
};
