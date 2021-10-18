import {useState} from 'react';
import {City, Offer} from '../../types/offers';
import Sorting from '../sorting/sorting';
import CardList from '../card-list/card-list';
import Map from '../map/map';

type CardListAndMapProps = {
  placesCount: number;
  offers: Offer[];
  city: City;
}

function OffersBoard({placesCount, offers, city}: CardListAndMapProps): JSX.Element {
  const [activeCardID, setActiveCardID] = useState<number | null>(null);

  const onMouseEnterCard = (id: number) => {
    setActiveCardID(id);
  };

  const onMouseLeaveCard = () => {
    setActiveCardID(null);
  };

  return (
    <div className='cities__places-container container'>
      {/*На время разработки*/}
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{placesCount} places to stay in Amsterdam</b>
        <Sorting />
        <div className='cities__places-list places__list tabs__content'>
          <CardList
            offers={offers}
            cardType={'cities'}
            onMouseEnterCard={onMouseEnterCard}
            onMouseLeaveCard={onMouseLeaveCard}
          />
        </div>
      </section>
      <Map offers={offers} city={city} activeCardID={activeCardID} />
    </div>
  );
}

export default OffersBoard;
