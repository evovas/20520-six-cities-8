import {CurrentUser, CurrentUserServer, Offer, Review, ServerOffer, ServerReview} from '../types/data';

export const adaptOfferToClient = (offer: ServerOffer): Offer => {
  const newOffer = {
    ...offer,
    isFavorite: offer['is_favorite'],
    isPremium: offer['is_premium'],
    maxAdults: offer['max_adults'],
    previewImage: offer['preview_image'],
    host: {
      ...offer.host,
      avatarUrl: offer.host['avatar_url'],
      isPro: offer.host['is_pro'],
    },
  };

  delete newOffer['is_favorite'];
  delete newOffer['is_premium'];
  delete newOffer['max_adults'];
  delete newOffer['preview_image'];
  delete newOffer.host['avatar_url'];
  delete newOffer.host['is_pro'];

  return newOffer as Offer;
};

export const adaptReviewToClient = (review: ServerReview): Review => {
  const newReview = {
    ...review,
    user: {
      ...review.user,
      avatarUrl: review.user['avatar_url'],
      isPro: review.user['is_pro'],
    },
  };

  delete newReview.user['avatar_url'];
  delete newReview.user['is_pro'];

  return newReview as Review;
};

export const adaptCurrentUserToClient = (user: CurrentUserServer): CurrentUser => {
  const newUser = {
    ...user,
    avatarUrl: user['avatar_url'],
    isPro: user['is_pro'],
  };

  delete newUser['avatar_url'];
  delete newUser['is_pro'];

  return newUser as CurrentUser;
};
