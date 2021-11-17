import {memo} from 'react';
import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/data';

type CardListProps = {
  offers: Offer[];
  cardType: string;
  onMouseEnterCard?: (id: number) => void;
  onMouseLeaveCard?: () => void;
}

function CardList({offers, cardType, onMouseEnterCard, onMouseLeaveCard}: CardListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onMouseEnterCard={onMouseEnterCard}
          onMouseLeaveCard={onMouseLeaveCard}
        />
      ))}
    </>
  );
}

export default memo(CardList);
