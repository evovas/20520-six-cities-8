import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {OFFERS} from './mocks/offers';

const Setting = {
  PLACES_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App placesCount={Setting.PLACES_COUNT} offers={OFFERS} />
  </React.StrictMode>,
  document.getElementById('root'));
