import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import { authApi } from './ApiController/authApi';
import { medicineApi } from './ApiController/medicineApi';
import { staffApi } from './ApiController/staffApi';
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
import { mediorderApi } from './ApiController/medicineOrderApi';

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
