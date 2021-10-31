import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {ThunkAppDispatch} from './types/action';
import {reducer} from './store/reducer';
import {requireAuthorization} from './store/action';
import {fetchOffersAction} from './store/api-actions';
import {createAPI} from './services/api';
import {AuthorizationStatus} from './const';
import {REVIEWS} from './mocks/reviews';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={REVIEWS} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
