import CardList from '../card-list/card-list';
import {Offers} from '../../types/offers';

type FavoritesLocationProps = {
  offers: Offers;
}

function FavoritesLocation({offers}: FavoritesLocationProps): JSX.Element {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='/#'>
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        <CardList offers={offers} cardType={'favorites'}/>
      </div>
    </li>
  );
}

export default FavoritesLocation;
