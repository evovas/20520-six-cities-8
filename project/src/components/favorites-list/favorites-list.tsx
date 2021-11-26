import {useSelector} from 'react-redux';
import FavoritesLocationsByCity from '../favorites-locations-by-city/favorites-locations-by-city';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import {getFavoriteOffers} from '../../store/favorites/selectors';
import {spliceOffersByCity} from '../../utils';

function FavoritesList(): JSX.Element {
  const favoriteOffers = useSelector(getFavoriteOffers);

  if (favoriteOffers.length === 0) {
    return <FavoritesEmpty />;
  }

  return (
    <section className='favorites' data-testid='favorites-list'>
      <h1 className='favorites__title'>Saved listing</h1>
      <ul className='favorites__list'>
        <div>
          {
            Object.entries(spliceOffersByCity(favoriteOffers)).map(([city, cityOffers]) =>
              <FavoritesLocationsByCity key={city} city={city} cityOffers={cityOffers} />)
          }
        </div>
      </ul>
    </section>
  );
}

export default FavoritesList;
