import {Offer, ServerOffer} from '../types/data';

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
