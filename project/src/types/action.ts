import {AxiosInstance} from 'axios';
import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from './state';

export enum ActionType {
  SelectCity = 'ui/selectCity',
  SelectSortingOption = 'ui/selectSortingOption',
  SetFavoriteOptionRequest = 'favorites/setFavoriteOptionRequest',
  SetFavoriteOptionSuccess= 'favorites/setFavoriteOptionSuccess',
  SetFavoriteOptionFailed = 'favorites/setFavoriteOptionFailed',
  ResetFavoriteOption = 'favorites/resetFavoriteOption',
  LoadOffersRequest = 'offers/loadOffersRequest',
  LoadOffersSuccess = 'offers/loadOffersSuccess',
  LoadOffersFailed = 'offers/loadOffersFailed',
  LoadOfferRequest = 'offers/loadOfferRequest',
  LoadOfferSuccess = 'offers/loadOfferSuccess',
  LoadOfferFailed = 'offers/loadOfferFailed',
  LoadNearbyOffersRequest = 'offers/loadNearbyOffersRequest',
  LoadNearbyOffersSuccess = 'offers/loadNearbyOffersSuccess',
  LoadNearbyOffersFailed = 'offers/loadNearbyOffersFailed',
  DropRoomOffersData = 'offers/dropRoomOffersData',
  LoadReviewsRequest = 'reviews/loadReviewsRequest',
  LoadReviewsSuccess = 'reviews/loadReviewsSuccess',
  LoadReviewsFailed = 'reviews/loadReviewsFailed',
  DropRoomReviewsData = 'reviews/dropRoomReviewsData',
  PostReviewRequest = 'reviews/postReviewRequest',
  PostReviewSuccess = 'dareviewsta/postReviewSuccess',
  PostReviewFailed = 'reviews/postReviewFailed',
  ResetPostReview = 'reviews/resetPostReview',
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
