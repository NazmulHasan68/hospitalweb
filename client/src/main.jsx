import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { appStore, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useLoadUserQuery } from './redux/ApiController/authApi';
import { ThreeDots } from 'react-loader-spinner';


const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <ThreeDots height="80" width="80" color="#3b7ccd" ariaLabel="loading" />
          <p className="mt-1 text-3xl text-sky-600">Growcare</p>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Custom>
    </Provider>
  </StrictMode>,
)



