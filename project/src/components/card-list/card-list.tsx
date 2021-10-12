import PlaceCard from '../place-card/place-card';
import {Offers} from '../../types/offers';
import {useState} from 'react';

type CardListProps = {
  offers: Offers;
  cardType: string;
}

function CardList({offers, cardType}: CardListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <>
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} cardType={cardType} />)}
    </>
  );
}

export default CardList;
