import {Offer} from './offers';

export enum ActionType {
  SelectCity = 'booking/selectCity',
  CreateOffersList = 'data/createOffersList',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: string;
}

export type CreateOffersListAction = {
  type: ActionType.CreateOffersList;
  payload: Offer[];
}

export type Actions = SelectCityAction | CreateOffersListAction;
