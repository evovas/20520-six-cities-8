import {Offer} from './data';
import {AuthorizationStatus, FetchStatus, SortingOption} from '../const';

export type State = {
  currentCityName: string;
  currentSorting: SortingOption;
  offers: Offer[] | [];
  offersStatus: FetchStatus;
  authorizationStatus: AuthorizationStatus;
}
