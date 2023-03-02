import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Expensescontext } from "./store/Expensescontext";
import "./style.css";
import { json } from "react-router";
export const Addexpenses = () => {
  const [data, setdata] = useState([]);
  const Authctx = useContext(Expensescontext);
  const Addmoneryref = useRef();
  const Adddescref = useRef();
  const addcatagoerref = useRef();

  let userdata = false;

  const userEmail = localStorage.getItem("email");
  const newEmail = userEmail.replace(/[@.]/g, "");
  console.log(newEmail);

  function getuserData() {
    axios
      .get(
        `https://new-tracker-dcbc7-default-rtdb.firebaseio.com/expenses.json`
      )
      .then((info) => {
        console.log(info);
        const result = [];
        for (let key in info) {
          result.push({ id: key, ...info[key] });
        }
        console.log(info);
        setdata(result);
        console.log(info);
      });
  }

  const submithandler = async (e) => {
    e.preventDefault();
    let EnterdMoneyValue = Addmoneryref.current.value;
    let EnterDescfvalue = Adddescref.current.value;
    let EnteredCatagoryvalue = addcatagoerref.current.value;

    if (userdata) {
      axios
        .put(
          `https://new-tracker-dcbc7-default-rtdb.firebaseio.com/expenses.json`,
          {
            EnterdMoneyValue,
            EnterDescfvalue,
            EnteredCatagoryvalue,
          }
        )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          userdata = false;
          Authctx.update(data.data);
          console.log(data.data);
          setdata(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let requestOptins = {
        EnterdMoneyValue,
        EnterDescfvalue,
        EnteredCatagoryvalue,
      };
      const response = await axios.post(
        `https://new-tracker-dcbc7-default-rtdb.firebaseio.com/expenses.json`,
        requestOptins
      );
      const userData = await response.data;
      console.log(userData);
    }
    getuserData();
  };

  // console.log(data, "inside state");

  useEffect(() => {
    getuserData();
  }, []);

  const deleteData = (id) => {
    console.log(id);
    // const response = await axios.delete(
    //   `https://expense-tracker-f1216-default-rtdb.firebaseio.com/${newEmail}expense/${id}.json`
    // );
    // // console.log(response);
    // getuserData();
  };

  const updateData = (id) => {
    //finds the index if matches than update tha value
    const index = data.findIndex((item) => item.id === id);
    //it will display data in the input boxes
    Addmoneryref.current.value = data[index].EnterdMoneyValue;
    Adddescref.current.value = data[index].EnterDescfvalue;
    addcatagoerref.current.value = data[index].EnteredCatagoryvalue;

    //console.log(data[index].EnterdMoneyValue, data[index].EnterDescfvalue, data[index].EnteredCatagoryvalue);

    //when update function is called than userdata should be updated trues
    userdata = true;
  };

  return (
    <div className="container">
      <form className="form">
        <label htmlFor="">Add Money</label>
        <input type="text" ref={Addmoneryref} placeholder="Add Money" />
        <br />
        <label htmlFor="">Add Desc</label>
        <input type="text" ref={Adddescref} placeholder="Desc" />
        <br />
        <label htmlFor="">Catagory</label>
        <select ref={addcatagoerref}>
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
          <option>Car</option>
        </select>
        <br />
        <br />
        <button onClick={submithandler} className="btn">
          Add Expenses
        </button>
      </form>
      <ul>
        {data.map((items) => {
          return (
            <li key={Math.random()}>
              {items.EnterdMoneyValue} {items.EnterDescfvalue}
              {items.EnteredCatagoryvalue}
              {/* {console.log(result)} */}
              {/* <button
                onClick={() => {
                  updateData(items.id);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteData(items.id)}>Delete</button> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
