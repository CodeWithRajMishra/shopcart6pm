import { createSlice } from "@reduxjs/toolkit";
import {message} from "antd";

const cartSlice= createSlice({
    name:"mycart",
    initialState:{
        cart:[]
    },

    reducers:{
        addtoCart:(state, actions)=>{
            const proData= state.cart.filter(key=>key.id==actions.payload.id);
            console.log(proData);
            if (proData.length>=1)
            {
               alert("Product aleready added!");
            }
            else
            {
            state.cart.push(actions.payload);
            alert("Product succesfully added!");
            }           
        }
    }
})


export const {addtoCart} = cartSlice.actions;
export default cartSlice.reducer;