import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import {ThunkAppDispatch} from './types/action';
import {reducer} from './store/reducer';
import {checkAuthSuccess} from './store/action';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {createAPI} from './services/api';
import {AuthorizationStatus} from './const';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => store.dispatch(checkAuthSuccess(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
