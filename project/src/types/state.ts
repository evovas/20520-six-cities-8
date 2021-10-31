import {Offer} from './offers';
import {AuthorizationStatus, SortingOption} from '../const';

export type State = {
  currentCityName: string;
  currentSorting: SortingOption;
  offers: Offer[] | [];
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
}
