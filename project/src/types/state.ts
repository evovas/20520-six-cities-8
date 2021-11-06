import {Offer, Review} from './data';
import {AuthorizationStatus, FetchStatus, SortingOption} from '../const';

export type State = {
  currentCityName: string;
  currentSorting: SortingOption;
  offers: Offer[] | [];
  offersStatus: FetchStatus;
  offer: Offer | null;
  offerStatus: FetchStatus;
  nearbyOffers: Offer[] | [];
  nearbyOffersStatus: FetchStatus;
  comments: Review[] | [];
  commentsStatus: FetchStatus;
  checkAuthStatus: FetchStatus;
  authorizationStatus: AuthorizationStatus;
  authorizationRequestStatus: FetchStatus;
  logoutStatus: FetchStatus;
}
