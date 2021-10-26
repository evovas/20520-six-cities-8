import {ActionType, CreateOffersListAction, SelectCityAction, SelectSortingOptionAction} from '../types/action';
import {Offer} from '../types/offers';
import {SortingOption} from '../const';

export const selectCity = (currentCityName: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: currentCityName,
});

export const createOffersList = (offers: Offer[]): CreateOffersListAction => ({
  type: ActionType.CreateOffersList,
  payload: offers,
});

export const selectSortingOption = (currentSorting: SortingOption): SelectSortingOptionAction => ({
  type: ActionType.SelectSortingOption,
  payload: currentSorting,
});
