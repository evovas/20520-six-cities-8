import {State} from '../../types/state';
import {Offer, Review} from '../../types/data';
import {NameSpace} from '../root-reducer';
import {FetchStatus} from '../../const';

export const getOffers = (state: State): Offer[] => state[NameSpace.data].offers;
export const getOffersStatus = (state: State): FetchStatus => state[NameSpace.data].offersStatus;
export const getOffer = (state: State):  Offer | null => state[NameSpace.data].offer;
export const getOfferStatus = (state: State): FetchStatus => state[NameSpace.data].offerStatus;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.data].nearbyOffers;
export const getNearbyOffersStatus = (state: State): FetchStatus => state[NameSpace.data].nearbyOffersStatus;
export const getReviews = (state: State): Review[] => state[NameSpace.data].reviews;
export const getReviewsStatus = (state: State): FetchStatus => state[NameSpace.data].reviewsStatus;
export const getReviewPostStatus = (state: State): FetchStatus => state[NameSpace.data].reviewPostStatus;
