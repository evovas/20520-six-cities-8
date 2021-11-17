import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import Header from '../../components/header/header';
import CardList from '../../components/card-list/card-list';
import NotFound from '../not-found/not-found';
import HostUser from '../../components/host-user/host-user';
import PropertyReviews from '../../components/property-reviews/property-reviews';
import PremiumLabel from '../../components/premium-label/premium-label';
import Loader from '../../components/loader/loader';
import Map from '../../components/map/map';
import LoadError from '../load-error/load-error';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import {calculateRatingStars} from '../../utils';
import {fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction} from '../../store/api-actions';
import {getNearbyOffers, getOffer, getOfferStatus} from '../../store/offers/selectors';
import {dropRoomOffersData, dropRoomReviewsData} from '../../store/action';
import {FetchStatus} from '../../const';
import styles from './room.module.scss';

type PageParams = {
  id: string;
}

function Room(): JSX.Element {
  const dispatch = useDispatch();
  const offer = useSelector(getOffer);
  const nearbyOffers = useSelector(getNearbyOffers).slice(0, 3);
  const offerStatus = useSelector(getOfferStatus);

  const {id: pageId} = useParams<PageParams>();

  useEffect(() => {
    dispatch(fetchOfferAction(pageId));
    dispatch(fetchNearbyOffersAction(pageId));
    dispatch(fetchReviewsAction(pageId));
    return () => {
      dispatch(dropRoomOffersData());
      dispatch(dropRoomReviewsData());
    };
  }, [pageId]);

  if (offerStatus === FetchStatus.Idle || offerStatus === FetchStatus.Loading){
    return <Loader size={15} isFullScreen />;
  }

  if (offerStatus === FetchStatus.Failed) {
    return <LoadError />;
  }

  if (!offer) {
    return <NotFound />;
  }

  const {id, bedrooms, description, goods, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type, city} = offer;

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
                <BookmarkButton buttonType={'property'} isFavoriteInitial={isFavorite} id={id} key={id} />
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
              <PropertyReviews pageId={pageId} />
            </div>
          </div>
          <Map className={'property__map'} offers={[...nearbyOffers, offer]} city={city} activeCardId={parseInt(pageId, 10)} />
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              <CardList offers={nearbyOffers} cardType={'near-places'} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
