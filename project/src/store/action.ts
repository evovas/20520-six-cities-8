import {ActionType} from '../types/action';
import {Offer} from '../types/data';
import {AuthorizationStatus, SortingOption} from '../const';

export const selectCity = (currentCityName: string) => ({
  type: ActionType.SelectCity,
  payload: currentCityName,
} as const);

export const selectSortingOption = (currentSorting: SortingOption) => ({
  type: ActionType.SelectSortingOption,
  payload: currentSorting,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);
