import {Offer} from './offers';
import {SortingOption} from '../const';

export enum ActionType {
  SelectCity = 'booking/selectCity',
  CreateOffersList = 'data/createOffersList',
  SelectSortingOption  = 'data/selectSortingOption',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: string;
}

export type CreateOffersListAction = {
  type: ActionType.CreateOffersList;
  payload: Offer[];
}

export type SelectSortingOptionAction = {
  type: ActionType.SelectSortingOption;
  payload: SortingOption;
}

export type Actions = SelectCityAction | CreateOffersListAction | SelectSortingOptionAction;
