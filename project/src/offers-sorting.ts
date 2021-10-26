import {Offer} from './types/offers';
import {SortingOption} from './const';

const comparePriceLowFirst = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
const comparePriceHighFirst = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;
const compareTopRatedFirst = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;

export const sortOffers = (offers: Offer[], sortingOption: SortingOption): Offer[] => {
  switch (sortingOption) {
    case SortingOption.Popular:
      return offers;
    case SortingOption.PriceLowFirst:
      return offers.slice().sort(comparePriceLowFirst);
    case SortingOption.PriceHighFirst:
      return offers.slice().sort(comparePriceHighFirst);
    case SortingOption.TopRatedFirst:
      return offers.slice().sort(compareTopRatedFirst);
  }
};
