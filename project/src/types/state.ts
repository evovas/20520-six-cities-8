import {Offer} from './data';
import {AuthorizationStatus, FetchState, SortingOption} from '../const';

export type State = {
  currentCityName: string;
  currentSorting: SortingOption;
  offers: Offer[] | [];
  offersLoading: FetchState;
  authorizationStatus: AuthorizationStatus;
}
