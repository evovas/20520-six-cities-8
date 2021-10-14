import {useParams} from 'react-router-dom';
import {Offer} from '../../types/offers';
import Header from '../../components/header/header';
import CardList from '../../components/card-list/card-list';
import NotFound from '../not-found/not-found';
import HostUser from '../../components/host-user/host-user';
import PropertyReviews from '../../components/property-reviews/property-reviews';
import PremiumLabel from '../../components/premium-label/premium-label';

type RoomProps = {
  offers: Offer[];
}

type PageParams = {
  id: string;
}

const ACTIVE_BOOKMARK_CLASS_NAME = 'property__bookmark-button--active';

function Room({offers}: RoomProps): JSX.Element {
  const {id:pageId} = useParams<PageParams>();
  const currentOffer = offers.find((offer) => offer.id === parseInt(pageId, 10));
  if (!currentOffer) {
    return <NotFound />;
  }

  return (
    <div className='page'>
      <Header />

      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {currentOffer.images.map((image) => (
                <div key={image} className='property__image-wrapper'>
                  <img className='property__image' src={image} alt='Photo studio'/>
                </div>
              ))}
            </div>
          </div>
          <div className='property__container container'>
            <div className='property__wrapper'>
              {currentOffer.isPremium && <PremiumLabel className={'property__mark'} />}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>
                  {currentOffer.title}
                </h1>
                <button className={`property__bookmark-button ${currentOffer.isFavorite ? ACTIVE_BOOKMARK_CLASS_NAME : ''} button`} type='button'>
                  <svg className='property__bookmark-icon' width='31' height='33'>
                    <use xlinkHref={'#icon-bookmark'}/>
                  </svg>
                  <span className='visually-hidden'>{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{width: '100%'}}/>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>4.8</span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire' style={{textTransform: 'capitalize'}}>
                  {currentOffer.type}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className='property__feature property__feature--adults'>
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{currentOffer.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {currentOffer.goods.map((item) => (
                    <li key={item} className='property__inside-item'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <HostUser user={currentOffer.host} />
                <div className='property__description'>
                  <p className='property__text'>
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <PropertyReviews offerId={currentOffer.id} />
            </div>
          </div>
          <section className='property__map map'/>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              <CardList offers={offers.slice(0, 3)} cardType={'near-places'} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
