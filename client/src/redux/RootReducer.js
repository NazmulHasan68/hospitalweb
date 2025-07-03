import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

import authReducer from "../redux/features/authSlice";
import cartReducer from "../redux/features/cartSlice";
import { authApi } from "./ApiController/authApi";
import { medicineApi } from "./ApiController/medicineApi";
import { staffApi } from "./ApiController/staffApi";
import { mediorderApi } from "./ApiController/medicineOrderApi";
import { hospitalApi } from "./ApiController/Hospital";
import { TravelApi } from "./ApiController/TravelApi";
import { consultationApi } from "./ApiController/consaltaionAPi";
import { appointmentApi } from "./ApiController/appointmentApi";
import { prescriptionApi } from "./ApiController/prescriptionApi";
import { dashboardApi } from "./ApiController/dashboardApi";
import { bannerApi } from "./ApiController/bannerApi";

// Persist config for cart only
const cartPersistConfig = {
  key: 'cart',
  storage,
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [medicineApi.reducerPath]: medicineApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [mediorderApi.reducerPath]: mediorderApi.reducer,
  [hospitalApi.reducerPath]: hospitalApi.reducer,
  [TravelApi.reducerPath]: TravelApi.reducer,
  [consultationApi.reducerPath]: consultationApi.reducer,
  [appointmentApi.reducerPath] : appointmentApi.reducer,
  [prescriptionApi.reducerPath] : prescriptionApi.reducer,
  [dashboardApi.reducerPath]:dashboardApi.reducer,
  [bannerApi.reducerPath]:bannerApi.reducer,
  auth: authReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export default rootReducer;
