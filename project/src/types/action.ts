import {AxiosInstance} from 'axios';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {
  selectCity,
  selectSortingOption,
  loadOffersRequest,
  loadOffersSuccess,
  loadOffersFailed,
  requireAuthorization
} from '../store/action';
import {State} from './state';

export enum ActionType {
  SelectCity = 'booking/selectCity',
  SelectSortingOption = 'booking/selectSortingOption',
  LoadOffersRequest = 'data/loadOffersRequest',
  LoadOffersSuccess = 'data/loadOffersSuccess',
  LoadOffersFailed = 'data/loadOffersFailed',
  RequireAuthorization = 'user/requireAuthorization',
}

export type Actions =
  | ReturnType<typeof selectCity>
  | ReturnType<typeof selectSortingOption>
  | ReturnType<typeof loadOffersRequest>
  | ReturnType<typeof loadOffersSuccess>
  | ReturnType<typeof loadOffersFailed>
  | ReturnType<typeof requireAuthorization>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
