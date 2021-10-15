import {useState} from 'react';
import Sorting from '../sorting/sorting';
import CardList from '../card-list/card-list';
import {Offer} from '../../types/offers';
import Map from '../map/map';

type CardListAndMapProps = {
  placesCount: number;
  offers: Offer[];
}

function OffersBoard({placesCount, offers}: CardListAndMapProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<null | number>(null);

  const onMouseEnterCard = (id: number) => {
    setActiveCard(id);
  };

  const onMouseLeaveCard = () => {
    setActiveCard(null);
  };

  return (
    <div className='cities__places-container container'>
      {/*На время разработки*/}
      <div>{activeCard}</div>
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
      <Map />
    </div>
  );
}

export default OffersBoard;
