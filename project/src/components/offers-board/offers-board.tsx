import {useState} from 'react';
import Sorting from '../sorting/sorting';
import CardList from '../card-list/card-list';
import Map from '../map/map';
import {City, Offer} from '../../types/offers';

type CardListAndMapProps = {
  placesCount: number;
  offers: Offer[];
  city: City;
}

function OffersBoard({placesCount, offers, city}: CardListAndMapProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const onMouseEnterCard = (id: number) => {
    setActiveCardId(id);
  };

  const onMouseLeaveCard = () => {
    setActiveCardId(null);
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
      <div className='cities__right-section'>
        <Map className={'cities__map'} offers={offers} city={city} activeCardId={activeCardId} />
      </div>
    </div>
  );
}

export default OffersBoard;
