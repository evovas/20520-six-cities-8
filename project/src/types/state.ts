import {Offer} from './data';
import {AuthorizationStatus, SortingOption} from '../const';

export type State = {
  currentCityName: string;
  currentSorting: SortingOption;
  offers: Offer[] | [];
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
}
