import {useState} from 'react';
import {useSelector} from 'react-redux';
import Sorting from '../sorting/sorting';
import CardList from '../card-list/card-list';
import Map from '../map/map';
import {City, Offer} from '../../types/offers';
import {State} from '../../types/state';
import {sortOffers} from '../../offers-sorting';
import {SortingOption} from '../../const';

type CardListAndMapProps = {
  currentCityOffers: Offer[];
}

function OffersBoard({currentCityOffers}: CardListAndMapProps): JSX.Element {
  const currentSorting = useSelector<State, SortingOption>((state) => state.currentSorting);

  const currentCity: City = currentCityOffers[0].city;

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const onMouseEnterCard = (id: number) => {
    setActiveCardId(id);
  };
  const onMouseLeaveCard = () => {
    setActiveCardId(null);
  };

  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{currentCityOffers.length} places to stay in {currentCity.name}</b>
        <Sorting
          currentSorting={currentSorting}
        />
        <div className='cities__places-list places__list tabs__content'>
          <CardList
            offers={sortOffers(currentCityOffers, currentSorting)}
            cardType={'cities'}
            onMouseEnterCard={onMouseEnterCard}
            onMouseLeaveCard={onMouseLeaveCard}
          />
        </div>
      </section>
      <div className='cities__right-section'>
        <Map className={'cities__map'} offers={currentCityOffers} city={currentCity} activeCardId={activeCardId} />
      </div>
    </div>
  );
}

export default OffersBoard;
