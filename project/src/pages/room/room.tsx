import {useParams} from 'react-router-dom';
import cn from 'classnames';
import Header from '../../components/header/header';
import CardList from '../../components/card-list/card-list';
import NotFound from '../not-found/not-found';
import HostUser from '../../components/host-user/host-user';
import PropertyReviews from '../../components/property-reviews/property-reviews';
import PremiumLabel from '../../components/premium-label/premium-label';
import {Offer} from '../../types/data';
import {Review} from '../../types/data';
import {calculateRatingStars} from '../../utils';
import styles from './room.module.scss';
import Map from '../../components/map/map';

type RoomProps = {
  offers: Offer[];
  reviews: Review[];
}

type PageParams = {
  id: string;
}

const NEAR_PLACES_COUNT = 3;

function Room({offers, reviews}: RoomProps): JSX.Element {
  const {id: pageId} = useParams<PageParams>();
  const currentOffer = offers.find((offer) => offer.id === parseInt(pageId, 10));
  if (!currentOffer) {
    return <NotFound />;
  }

  const {id, bedrooms, description, goods, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type, city} = currentOffer;
  const nearPlaces = offers.slice(0, NEAR_PLACES_COUNT);

  return (
    <div className='page'>
      <Header />

      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {images.map((image) => (
                <div key={image} className='property__image-wrapper'>
                  <img className='property__image' src={image} alt={title}/>
                </div>
              ))}
            </div>
          </div>
          <div className='property__container container'>
            <div className='property__wrapper'>
              {isPremium && <PremiumLabel className={'property__mark'} />}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>
                  {title}
                </h1>
                <button className={cn('property__bookmark-button', 'button', {'property__bookmark-button--active':isFavorite})} type='button'>
                  <svg className='property__bookmark-icon' width='31' height='33'>
                    <use xlinkHref={'#icon-bookmark'}/>
                  </svg>
                  <span className='visually-hidden'>{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{width: calculateRatingStars(rating)}}/>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>{rating}</span>
              </div>
              <ul className='property__features'>
                <li className={cn('property__feature', styles.propertyFeatureEntire)}>
                  {type}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {bedrooms} Bedrooms
                </li>
                <li className='property__feature property__feature--adults'>
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {goods.map((item) => (
                    <li key={item} className='property__inside-item'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <HostUser user={host} />
                <div className='property__description'>
                  <p className='property__text'>
                    {description}
                  </p>
                </div>
              </div>
              <PropertyReviews offerId={id} reviews={reviews} />
            </div>
          </div>
          <Map className={'property__map'} offers={nearPlaces} city={city} />
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              <CardList offers={nearPlaces} cardType={'near-places'} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
