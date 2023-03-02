import React, { useState } from "react";
import { createContext } from "react";

export const Expensescontext = React.createContext({
    addItems: (items) => { }
});

export const Authcontextproviders = (props) => {
    const [item, setitems] = useState([]);
    const [data,setdata] = useState([]);

    //for adding the items in the handler 
    const AdditemHandler = (items) => {
        setitems((prestate) => {
            return (
                [...prestate, items]
            )
        })

    }

    const updateItems = (data) => {

        //   This code is written in JavaScript and is used to find the index of
        //  an item in an array. The item is an array of objects, and the data
        //   parameter is an object that contains the id property. 
        //   The findIndex() method will loop through each element 
        //   in the item array and check if the id property of the
        //   current element matches with the id property of the data object. 
        //   If a match is found, it will return the index of that element in
        //    the array.
        const index = item.findIndex((item) => item.id === data.id);



        // This code is using the spread 
        // operator to create a new array called updatedItems, 
        // which is a copy of the existing array called item.
        //  The spread operator allows us to take all of the
        //   elements from the existing array and spread them 
        //   out into a new array. This is useful for creating copies 
        //   of arrays without modifying the original array.

        const updatedItems = [...item];
        // This code is used to update an item in 
        // a React component. The index parameter
        //  is the index of the item in the array
        //   that needs to be updated, and data 
        //   is the new value that will be 
        //   assigned to the item. 
        // For example: 
        // const items = [1, 2, 3]; 
        // const data = 4; 
        // const index = 2; 
        // updateItems[index] = data; 
        // // items will now be [1, 2, 4]


        updateItems[index] = data;
        setitems(updatedItems);

    }

    const updateProfile = (data)=>{
        const userid =data.findIndex((item)=>item.id===data.id);
        const updatedData = [...data];
        updatedData[userid] = data;
        setdata(updatedData);
    }

    // console.log(item);

    const contextvalue = {
        addItems: AdditemHandler,
        item: item,
        update: updateItems,
        updatedDatas:updateProfile

    }


    return (
        <Expensescontext.Provider value={contextvalue}>
            {props.children}
        </Expensescontext.Provider>
    )
}