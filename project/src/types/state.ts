import {CurrentUser, Offer, Review} from './data';
import {AuthorizationStatus, FetchStatus, SortingOption} from '../const';
import {RootState} from '../store/root-reducer';

export type AppData = {
  offers: Offer[] | [];
  offersStatus: FetchStatus;
  offer: Offer | null;
  offerStatus: FetchStatus;
  nearbyOffers: Offer[] | [];
  nearbyOffersStatus: FetchStatus;
  reviews: Review[] | [];
  reviewsStatus: FetchStatus;
  reviewPostStatus: FetchStatus;
}

export type BookingProcess = {
  currentCityName: string;
  currentSorting: SortingOption;
}

export type UserProcess = {
  currentUser: CurrentUser | null;
  checkAuthStatus: FetchStatus;
  authorizationStatus: AuthorizationStatus;
  authorizationRequestStatus: FetchStatus;
  logoutStatus: FetchStatus;
}

export type State = RootState;
