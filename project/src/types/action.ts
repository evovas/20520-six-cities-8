import {AxiosInstance} from 'axios';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {
  selectCity,
  selectSortingOption,
  loadOffersRequest,
  loadOffersSuccess,
  loadOffersFailed,
  requireAuthorizationSuccess,
  requireAuthorizationRequest,
  requireAuthorizationFailed,
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailed,
  requireLogoutRequest,
  requireLogoutSuccess,
  requireLogoutFailed
} from '../store/action';
import {State} from './state';

export enum ActionType {
  SelectCity = 'booking/selectCity',
  SelectSortingOption = 'booking/selectSortingOption',
  LoadOffersRequest = 'data/loadOffersRequest',
  LoadOffersSuccess = 'data/loadOffersSuccess',
  LoadOffersFailed = 'data/loadOffersFailed',
  CheckAuthRequest = 'user/checkAuthRequest',
  CheckAuthSuccess = 'user/checkAuthSuccess',
  CheckAuthFailed = 'user/checkAuthFailed',
  RequireAuthorizationRequest = 'user/requireAuthorizationRequest',
  RequireAuthorizationSuccess = 'user/requireAuthorizationSuccess',
  RequireAuthorizationFailed = 'user/requireAuthorizationFailed',
  RequireLogoutRequest = 'user/requireLogout',
  RequireLogoutSuccess = 'user/requireLogout',
  RequireLogoutFailed = 'user/requireLogout',
}

export type Actions =
  | ReturnType<typeof selectCity>
  | ReturnType<typeof selectSortingOption>
  | ReturnType<typeof loadOffersRequest>
  | ReturnType<typeof loadOffersSuccess>
  | ReturnType<typeof loadOffersFailed>
  | ReturnType<typeof checkAuthRequest>
  | ReturnType<typeof checkAuthSuccess>
  | ReturnType<typeof checkAuthFailed>
  | ReturnType<typeof requireAuthorizationRequest>
  | ReturnType<typeof requireAuthorizationSuccess>
  | ReturnType<typeof requireAuthorizationFailed>
  | ReturnType<typeof requireLogoutRequest>
  | ReturnType<typeof requireLogoutSuccess>
  | ReturnType<typeof requireLogoutFailed>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
