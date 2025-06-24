import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

import authReducer from "../redux/features/authSlice";
import cartReducer from "../redux/features/cartSlice";
import { authApi } from "./ApiController/authApi";
import { medicineApi } from "./ApiController/medicineApi";
import { staffApi } from "./ApiController/staffApi";

// Persist config for cart only
const cartPersistConfig = {
  key: 'cart',
  storage,
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [medicineApi.reducerPath]: medicineApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  auth: authReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export default rootReducer;
