import {memo} from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import PremiumLabel from '../premium-label/premium-label';
import {Offer} from '../../types/data';
import {calculateRatingStars} from '../../utils';
import styles from './place-card.module.scss';
import BookmarkButton from '../bookmark-button/bookmark-button';

type CardProps = {
  offer: Offer;
  cardType: string;
  onMouseEnterCard?: (id: number) => void;
  onMouseLeaveCard?: () => void;
}

const ArticleClassName = new Map([
  ['cities', 'cities__place-card'],
  ['favorites', 'favorites__card'],
  ['near-places', 'near-places__card'],
]);

function PlaceCard({offer, cardType, onMouseEnterCard, onMouseLeaveCard}: CardProps): JSX.Element {
  const mouseEnterHandler = () => {
    if (onMouseEnterCard) {
      onMouseEnterCard(offer.id);
    }
  };

  const mouseLeaveHandler = () => {
    if (onMouseLeaveCard) {
      onMouseLeaveCard();
    }
  };

  return (
    <article
      className={`${ArticleClassName.get(cardType)} place-card`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      data-testid="place-card"
    >
      {offer.isPremium && <PremiumLabel className={'place-card__mark'} />}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`} data-testid='place-card-image-link'>
          <img className='place-card__image' src={offer.previewImage}
            width={cardType === 'favorites' ? '150' : '260'}
            height={cardType === 'favorites' ? '110' : '200'} alt={offer.title}
          />
        </Link>
      </div>
      <div className={`${cardType}__card-info place-card__info`}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <BookmarkButton buttonType={'place-card'} isFavorite={offer.isFavorite} id={offer.id} key={offer.id} />
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: calculateRatingStars(offer.rating)}}/>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`/offer/${offer.id}`} data-testid='place-card-title-link'>{offer.title}</Link>
        </h2>
        <p className={cn(styles.placeCardType, 'place-card__type')}>{offer.type}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);
