import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {OFFERS} from './mocks/offers';
import {REVIEWS} from './mocks/reviews';

const Setting = {
  PLACES_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App placesCount={Setting.PLACES_COUNT} offers={OFFERS} reviews={REVIEWS} />
  </React.StrictMode>,
  document.getElementById('root'));
