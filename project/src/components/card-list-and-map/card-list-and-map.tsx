import Sorting from "../sorting/sorting";
import CardList from "../card-list/card-list";
import {Offers} from "../../types/offers";
import {useState} from "react";

type CardListAndMapProps = {
  placesCount: number;
  offers: Offers;
}

function CardListAndMap({placesCount, offers}: CardListAndMapProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<null | number>(null);

  const handleMouseEnterCard = (id: number) => {
    setActiveCard(id);
  };

  const handleMouseLeaveCard = () => {
    setActiveCard(null);
  };

  return (
    <div className='cities__places-container container'>
      <div>{activeCard}</div>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{placesCount} places to stay in Amsterdam</b>
        <Sorting/>
        <div className='cities__places-list places__list tabs__content'>
          <CardList offers={offers} cardType={'cities'} handleMouseEnterCard={handleMouseEnterCard} handleMouseLeaveCard={handleMouseLeaveCard} />
        </div>
      </section>
      <div className='cities__right-section'>
        <section className='cities__map map'/>
      </div>
    </div>
  );
}

export default CardListAndMap;
