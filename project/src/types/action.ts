import {AxiosInstance} from 'axios';
import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from './state';

export enum ActionType {
  SelectCity = 'booking/selectCity',
  SelectSortingOption = 'booking/selectSortingOption',
  LoadOffersRequest = 'data/loadOffersRequest',
  LoadOffersSuccess = 'data/loadOffersSuccess',
  LoadOffersFailed = 'data/loadOffersFailed',
  LoadOfferRequest = 'data/loadOfferRequest',
  LoadOfferSuccess = 'data/loadOfferSuccess',
  LoadOfferFailed = 'data/loadOfferFailed',
  LoadNearbyOffersRequest = 'data/loadNearbyOffersRequest',
  LoadNearbyOffersSuccess = 'data/loadNearbyOffersSuccess',
  LoadNearbyOffersFailed = 'data/loadNearbyOffersFailed',
  LoadReviewsRequest = 'data/loadReviewsRequest',
  LoadReviewsSuccess = 'data/loadReviewsSuccess',
  LoadReviewsFailed = 'data/loadReviewsFailed',
  DropRoomData = 'data/dropRoomData',
  PostReviewRequest = 'data/postReviewRequest',
  PostReviewSuccess = 'data/postReviewSuccess',
  PostReviewFailed = 'data/postReviewFailed',
  ResetPostReview = 'data/resetPostReview',
  SaveCurrentUser = 'user/saveCurrentUser',
  DropCurrentUser = 'user/dropCurrentUser',
  CheckAuthRequest = 'user/checkAuthRequest',
  CheckAuthSuccess = 'user/checkAuthSuccess',
  CheckAuthFailed = 'user/checkAuthFailed',
  RequireAuthorizationRequest = 'user/requireAuthorizationRequest',
  RequireAuthorizationSuccess = 'user/requireAuthorizationSuccess',
  RequireAuthorizationFailed = 'user/requireAuthorizationFailed',
  RequireLogoutRequest = 'user/requireLogoutRequest',
  RequireLogoutSuccess = 'user/requireLogoutSuccess',
  RequireLogoutFailed = 'user/requireLogoutFailed',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
