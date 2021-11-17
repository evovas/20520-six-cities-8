import {CurrentUser, Offer, Review} from './data';
import {AuthorizationStatus, FetchStatus, SortingOption} from '../const';
import {RootState} from '../store/root-reducer';

export type Offers = {
  offers: Offer[] | [];
  offersStatus: FetchStatus;
  offer: Offer | null;
  offerStatus: FetchStatus;
  nearbyOffers: Offer[] | [];
  nearbyOffersStatus: FetchStatus;
}

export type Reviews = {
  reviews: Review[] | [];
  reviewsStatus: FetchStatus;
  reviewPostStatus: FetchStatus;
}

export type Favorites = {
  favoriteOptionStatus: FetchStatus;
  favoriteOptionOffer: Offer | null;
}

export type UI = {
  currentCityName: string;
  currentSorting: SortingOption;
}

export type User = {
  currentUser: CurrentUser | null;
  checkAuthStatus: FetchStatus;
  authorizationStatus: AuthorizationStatus;
  authorizationRequestStatus: FetchStatus;
  logoutStatus: FetchStatus;
}

export type State = RootState;
