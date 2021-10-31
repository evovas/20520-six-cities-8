import {AxiosInstance} from 'axios';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {
  selectCity,
  selectSortingOption,
  loadOffers,
  requireAuthorization
} from '../store/action';
import {State} from './state';

export enum ActionType {
  SelectCity = 'booking/selectCity',
  SelectSortingOption = 'booking/selectSortingOption',
  CreateOffersList = 'data/createOffersList',
  LoadOffers = 'data/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
}

export type Actions =
  | ReturnType<typeof selectCity>
  | ReturnType<typeof selectSortingOption>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof requireAuthorization>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
