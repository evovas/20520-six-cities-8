import {Offer} from './offers';

export enum ActionType {
  SelectCity = 'booking/selectCity',
  ProcessOffers = 'data/processOffers',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: string;
}

export type ProcessOffersAction = {
  type: ActionType.ProcessOffers;
  payload: Offer[];
}

export type Actions = SelectCityAction | ProcessOffersAction;
