import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import {ThunkAppDispatch} from './types/action';
import {checkAuthSuccess} from './store/action';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {createAPI} from './services/api';
import {AuthorizationStatus} from './const';
import 'react-toastify/dist/ReactToastify.css';
import {rootReducer} from './store/root-reducer';
import {HashRouter} from 'react-router-dom';

const api = createAPI(
  () => store.dispatch(checkAuthSuccess(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ToastContainer />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
