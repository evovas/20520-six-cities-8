import CardList from '../card-list/card-list';
import {Offer} from '../../types/data';

type FavoritesLocationsByCityProps = {
  city: string;
  cityOffers: Offer[];
}

function FavoritesLocationsByCity({city, cityOffers}: FavoritesLocationsByCityProps): JSX.Element {
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

export default FavoritesLocationsByCity;
