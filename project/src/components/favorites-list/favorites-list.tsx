import {useSelector} from 'react-redux';
import FavoritesLocationsByCity from '../favorites-locations-by-city/favorites-locations-by-city';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import {Offer} from '../../types/data';
import {getFavoritesOffers} from '../../store/favorites/selectors';

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


function FavoritesList(): JSX.Element {
  const favoritesOffers = useSelector(getFavoritesOffers);

  if (favoritesOffers.length === 0) {
    return <FavoritesEmpty />;
  }

  return (
    <section className='favorites'>
      <h1 className='favorites__title'>Saved listing</h1>
      <ul className='favorites__list'>
        <div>
          {
            Object.entries(spliceOffersByCity(favoritesOffers)).map(([city, cityOffers]) =>
              <FavoritesLocationsByCity key={city} city={city} cityOffers={cityOffers} />)
          }
        </div>
      </ul>
    </section>
  );
}

export default FavoritesList;
