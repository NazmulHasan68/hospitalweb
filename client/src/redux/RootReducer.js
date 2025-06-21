import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice"; 
import cartReducer from "../redux/features/cartSlice"
import { authApi } from "./ApiController/authApi";
import { medicineApi } from "./ApiController/medicineApi";
import { staffApi } from "./ApiController/staffApi";


const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [medicineApi.reducerPath] : medicineApi.reducer,
    [staffApi.reducerPath] : staffApi.reducer,
    auth:authReducer, 
    cart:cartReducer,
});
export default rootRedcuer;