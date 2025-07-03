import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import { authApi } from './ApiController/authApi';
import { medicineApi } from './ApiController/medicineApi';
import { staffApi } from './ApiController/staffApi';
import { mediorderApi } from './ApiController/medicineOrderApi';
import { hospitalApi } from './ApiController/Hospital';
import { TravelApi } from './ApiController/TravelApi';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { consultationApi } from './ApiController/consaltaionAPi';
import { appointmentApi } from './ApiController/appointmentApi';
import { prescriptionApi } from './ApiController/prescriptionApi';
import { dashboardApi } from './ApiController/dashboardApi';
import { bannerApi } from './ApiController/bannerApi';



export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      medicineApi.middleware,
      staffApi.middleware,
      mediorderApi.middleware,
      hospitalApi.middleware,
      TravelApi.middleware,
      consultationApi.middleware,
      appointmentApi.middleware,
      prescriptionApi.middleware,
      dashboardApi.middleware,
      bannerApi.middleware,
    ),
});

export const persistor = persistStore(appStore);

// Optional: if you want to load user on app start
const initializeApp = async () => {
  try {
    await appStore
      .dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
      .unwrap();
  } catch (error) {
    console.error("Error loading user:", error);
  }
};

initializeApp();
