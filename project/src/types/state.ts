import {Offer} from './offers';

export type State = {
  currentCityName: string;
  offers: Offer[] | [];
}
