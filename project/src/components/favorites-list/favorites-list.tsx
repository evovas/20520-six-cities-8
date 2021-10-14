import CardList from '../card-list/card-list';
import {Offer} from '../../types/offers';

type FavoritesLocationProps = {
  offers: Offer[];
}

type CityAndOffers = {
  city: string;
  cityOffers: Offer[];
}

const spliceOffersByCity = (offers: Offer[]): {[key: string]: Offer[]} => (
  offers.reduce<{[city: string]: Offer[]}>((acc, offer)=> {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {})
);

function FavoritesLocationsByCity({city, cityOffers}: CityAndOffers): JSX.Element {
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
        <CardList offers={cityOffers} cardType={'favorites'} />
      </div>
    </li>
  );
}

function GroupedByCityOffers({offers}: {offers: Offer[]}): JSX.Element {
  return (
    <>
      {
        Object.entries(spliceOffersByCity(offers)).map(([city, cityOffers]) =>
          <FavoritesLocationsByCity key={city} city={city} cityOffers={cityOffers} />)
      }
    </>
  );
}

function FavoritesList({offers}: FavoritesLocationProps): JSX.Element {
  return (
    <div>
      <GroupedByCityOffers offers={offers} />
    </div>
  );
}

export default FavoritesList;
