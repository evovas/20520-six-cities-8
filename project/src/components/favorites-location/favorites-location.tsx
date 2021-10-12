import CardList from '../card-list/card-list';
import {Offers} from '../../types/offers';

type FavoritesLocationProps = {
  offers: Offers;
}

const spliceOffersByCity = (offers: Offers): Map<string, Offers> => {
  const sortedOffers = new Map();
  let prevCity = null;

  for(const offer of offers) {
    const city = offer.city.name;
    if (prevCity === city) {
      sortedOffers.get(city).push(offer);
    } else {
      sortedOffers.set(city, [offer]);
    }
    prevCity = city;
  }

  return sortedOffers;
};

type CityAndOffers = {
  city: string;
  cityOffers: Offers;
}

function FavoritesLocationsByCity ({city, cityOffers}: CityAndOffers): JSX.Element {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='/#'>
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        <CardList offers={cityOffers} cardType={'favorites'}/>
      </div>
    </li>
  );
}

function FavoritesLocations({offers}: FavoritesLocationProps): JSX.Element {
  return (
    <div>{Array.from(spliceOffersByCity(offers), ([city, cityOffers]) => ({city, cityOffers})).map((cityAndOffers) => FavoritesLocationsByCity(cityAndOffers))}</div>
  );
}

export default FavoritesLocations;
