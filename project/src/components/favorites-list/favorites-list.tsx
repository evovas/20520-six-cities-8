import {Offer} from '../../types/offers';
import FavoritesLocationsByCity from '../favorites-locations-by-city/favorites-locations-by-city';

type FavoritesListProps = {
  offers: Offer[];
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

function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  return (
    <div>
      {
        Object.entries(spliceOffersByCity(offers)).map(([city, cityOffers]) =>
          <FavoritesLocationsByCity key={city} city={city} cityOffers={cityOffers} />)
      }
    </div>
  );
}

export default FavoritesList;
