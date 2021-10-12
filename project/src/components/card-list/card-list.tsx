import PlaceCard from '../place-card/place-card';
import {Offers} from '../../types/offers';
import {useState} from 'react';

type CardListProps = {
  offers: Offers;
  cardType: string;
  handleMouseEnterCard?: (id: number) => void;
  handleMouseLeaveCard?: () => void;
}

function CardList({offers, cardType, handleMouseEnterCard, handleMouseLeaveCard}: CardListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} cardType={cardType} onMouseEnterCard={handleMouseEnterCard} onMouseLeaveCard={handleMouseLeaveCard} />)}
    </>
  );
}

export default CardList;
