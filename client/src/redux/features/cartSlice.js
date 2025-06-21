import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAuthenticated:false
}


const cartSlice = createSlice({
    name : "cartSlice",
    initialState,
    reducers:{
     
    }
})

export const { } = cartSlice.actions;
export default cartSlice.reducer