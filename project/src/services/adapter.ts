import {CurrentUser, CurrentUserServer, Offer, Review, ServerOffer, ServerReview} from '../types/data';

export const adaptOfferToClient = (offer: ServerOffer): Offer => (
  Object.assign(
    {},
    offer,
    {
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      maxAdults: offer['max_adults'],
      previewImage: offer['preview_image'],
      host: Object.assign(
        {},
        offer.host,
        {
          avatarUrl: offer.host['avatar_url'],
          isPro: offer.host['is_pro'],
        },
      ),
    },
  )
);

export const adaptReviewToClient = (review: ServerReview): Review => (
  Object.assign(
    {},
    review,
    {
      date: new Date(review.date),
      user: Object.assign(
        {},
        review.user,
        {
          avatarUrl: review.user['avatar_url'] ?? '',
          isPro: review.user['is_pro'],
        },
      ),
    },
  )
);

export const adaptCurrentUserToClient = (user: CurrentUserServer): CurrentUser => (
  Object.assign(
    {},
    user,
    {
      avatarUrl: user['avatar_url'],
      isPro: user['is_pro'],
    },
  )
);
