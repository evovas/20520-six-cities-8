import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {reducer} from './store/reducer';
import {OFFERS, AMSTERDAM_CITY} from './mocks/offers';
import {REVIEWS} from './mocks/reviews';

const Setting = {
  PLACES_COUNT: 312,
};

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App placesCount={Setting.PLACES_COUNT} offers={OFFERS} reviews={REVIEWS} city={AMSTERDAM_CITY} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
