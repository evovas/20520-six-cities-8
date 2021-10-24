import {ActionType, CreateOffersListAction, SelectCityAction} from '../types/action';
import {Offer} from '../types/offers';

export const selectCity = (currentCityName: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: currentCityName,
});

export const createOffersList = (offers: Offer[]): CreateOffersListAction => ({
  type: ActionType.CreateOffersList,
  payload: offers,
});
