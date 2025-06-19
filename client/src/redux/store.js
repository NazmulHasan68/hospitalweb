import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import { authApi } from './ApiController/authApi';
import { medicineApi } from './ApiController/medicineApi';
import { staffApi } from './ApiController/staffApi';


export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware().concat(authApi.middleware, medicineApi.middleware, staffApi.middleware),
});


const initializeApp = async () => {
    try {
        await appStore.dispatch(
            authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
        );
    } catch (error) {
        console.error("Error loading user:", error);
    }
};
initializeApp();

