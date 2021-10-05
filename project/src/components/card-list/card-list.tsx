import PlaceCard from '../place-card/place-card';

type CardListProps = {
  cards: number[];
  cardType: string;
}

function CardList({cards, cardType}: CardListProps): JSX.Element {
  return (
    <>
      {cards.map((item) => <PlaceCard key={item} cardType={cardType}/>)}
    </>
  );
}

export default CardList;
