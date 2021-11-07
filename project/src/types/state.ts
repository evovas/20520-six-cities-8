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
  reviews: Review[] | [];
  reviewsStatus: FetchStatus;
  reviewPostStatus: FetchStatus;
  checkAuthStatus: FetchStatus;
  authorizationStatus: AuthorizationStatus;
  authorizationRequestStatus: FetchStatus;
  logoutStatus: FetchStatus;
}
