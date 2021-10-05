import CardList from '../card-list/card-list';

const cards = Array.from({length: 2}, (_, i) => i);

function FavoritesLocation(): JSX.Element {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='/#'>
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        <CardList cards={cards} cardType={'favorites'}/>
      </div>
    </li>
  );
}

export default FavoritesLocation;
