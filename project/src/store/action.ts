import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {AuthorizationStatus, SortingOption} from '../const';
import {CurrentUser, Offer, Review} from '../types/data';

export const selectCity = createAction(
  ActionType.SelectCity,
  (currentCityName: string) => ({
    payload: currentCityName,
  }),
);

export const selectSortingOption = createAction(
  ActionType.SelectSortingOption,
  (currentSorting: SortingOption) => ({
    payload: currentSorting,
  }),
);

export const setFavoriteOptionRequest = createAction(ActionType.SetFavoriteOptionRequest);
export const setFavoriteOptionSuccess = createAction(ActionType.SetFavoriteOptionSuccess);
export const setFavoriteOptionFailed = createAction(ActionType.SetFavoriteOptionFailed);

export const loadFavoriteOffersRequest = createAction(ActionType.LoadFavoriteOffersRequest);
export const loadFavoriteOffersSuccess = createAction(
  ActionType.LoadFavoriteOffersSuccess,
  (offers: Offer[] | []) => ({
    payload: offers,
  }),
);
export const loadFavoriteOffersFailed = createAction(ActionType.LoadFavoriteOffersFailed);
export const dropFavoriteOffers = createAction(ActionType.DropFavoriteOffers);

export const deleteFavoriteOffer = createAction(
  ActionType.DeleteFavoriteOffer,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const loadOffersRequest = createAction(ActionType.LoadOffersRequest);
export const loadOffersSuccess = createAction(
  ActionType.LoadOffersSuccess,
  (offers: Offer[] | []) => ({
    payload: offers,
  }),
);
export const loadOffersFailed = createAction(ActionType.LoadOffersFailed);

export const loadOfferRequest = createAction(ActionType.LoadOfferRequest);
export const loadOfferSuccess = createAction(
  ActionType.LoadOfferSuccess,
  (offer: Offer | null) => ({
    payload: offer,
  }),
);
export const loadOfferFailed = createAction(ActionType.LoadOfferFailed);

export const loadNearbyOffersRequest = createAction(ActionType.LoadNearbyOffersRequest);
export const loadNearbyOffersSuccess = createAction(
  ActionType.LoadNearbyOffersSuccess,
  (offers: Offer[] | []) => ({
    payload: offers,
  }),
);
export const loadNearbyOffersFailed = createAction(ActionType.LoadNearbyOffersFailed);

export const dropRoomOffersData = createAction(ActionType.DropRoomOffersData);

export const changeRoomOffer = createAction(
  ActionType.ChangeRoomOffer,
  (offer: Offer) => ({
    payload: offer,
  }),
);
export const replaceOffer = createAction(
  ActionType.ReplaceOffer,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const loadReviewsRequest = createAction(ActionType.LoadReviewsRequest);
export const loadReviewsSuccess = createAction(
  ActionType.LoadReviewsSuccess,
  (reviews: Review[] | []) => ({
    payload: reviews,
  }),
);
export const loadReviewsFailed = createAction(ActionType.LoadReviewsFailed);

export const dropRoomReviewsData = createAction(ActionType.DropRoomReviewsData);

export const postReviewRequest = createAction(ActionType.PostReviewRequest);
export const postReviewSuccess = createAction(
  ActionType.PostReviewSuccess,
  (reviews: Review[]) => ({
    payload: reviews,
  }),
);
export const postReviewFailed = createAction(ActionType.PostReviewFailed);

export const resetPostReview = createAction(ActionType.ResetPostReview);

export const saveCurrentUser = createAction(
  ActionType.SaveCurrentUser,
  (user: CurrentUser) => ({
    payload: user,
  }),
);

export const dropCurrentUser = createAction(ActionType.DropCurrentUser);

export const checkAuthRequest = createAction(ActionType.CheckAuthRequest);
export const checkAuthSuccess = createAction(
  ActionType.CheckAuthSuccess,
  (authorizationStatus: AuthorizationStatus) => ({
    payload: authorizationStatus,
  }),
);
export const checkAuthFailed = createAction(ActionType.CheckAuthFailed);

export const requireAuthorizationRequest = createAction(ActionType.RequireAuthorizationRequest);
export const requireAuthorizationSuccess = createAction(ActionType.RequireAuthorizationSuccess);
export const requireAuthorizationFailed = createAction(ActionType.RequireAuthorizationFailed);

export const requireLogoutRequest = createAction(ActionType.RequireLogoutRequest);
export const requireLogoutSuccess = createAction(ActionType.RequireLogoutSuccess);
export const requireLogoutFailed = createAction(ActionType.RequireLogoutFailed);
