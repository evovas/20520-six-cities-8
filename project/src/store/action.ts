import {ActionType, ProcessOffersAction, SelectCityAction} from '../types/action';
import {Offer} from '../types/offers';

export const selectCity = (currentCityName: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: currentCityName,
});

export const processOffers = (offers: Offer[]): ProcessOffersAction => ({
  type: ActionType.ProcessOffers,
  payload: offers,
});
