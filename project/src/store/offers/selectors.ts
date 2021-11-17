import {createSelector} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {Offer} from '../../types/data';
import {NameSpace} from '../root-reducer';
import {FetchStatus} from '../../const';
import {getCurrentCityName, getCurrentSorting} from '../ui/selectors';
import {sortOffers} from '../../offers-sorting';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getOffersStatus = (state: State): FetchStatus => state[NameSpace.Offers].offersStatus;
export const getOffer = (state: State):  Offer | null => state[NameSpace.Offers].offer;
export const getOfferStatus = (state: State): FetchStatus => state[NameSpace.Offers].offerStatus;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Offers].nearbyOffers;
export const getNearbyOffersStatus = (state: State): FetchStatus => state[NameSpace.Offers].nearbyOffersStatus;

export const selectOffers = createSelector([getOffers, getCurrentCityName, getCurrentSorting], (offers, cityName, sorting) => {
  const offersByCity = offers.filter((offer: Offer) => offer.city.name === cityName);
  return sortOffers(offersByCity, sorting);
});
