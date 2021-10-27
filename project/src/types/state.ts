import {Offer} from './offers';
import {SortingOption} from '../const';

export type State = {
  currentCityName: string;
  currentSorting: SortingOption;
  offers: Offer[] | [];
}
