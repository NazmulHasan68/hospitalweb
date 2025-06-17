import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice"; 
import { authApi } from "./ApiController/authApi";
import { medicineApi } from "./ApiController/medicineApi";


const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [medicineApi.reducerPath] : medicineApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;