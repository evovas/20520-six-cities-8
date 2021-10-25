import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {reducer} from './store/reducer';
import {REVIEWS} from './mocks/reviews';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={REVIEWS} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
