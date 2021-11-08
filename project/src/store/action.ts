import {ActionType} from '../types/action';
import {CurrentUser, Offer, Review} from '../types/data';
import {AuthorizationStatus, SortingOption} from '../const';

export const selectCity = (currentCityName: string) => ({
  type: ActionType.SelectCity,
  payload: currentCityName,
} as const);

export const selectSortingOption = (currentSorting: SortingOption) => ({
  type: ActionType.SelectSortingOption,
  payload: currentSorting,
} as const);

export const loadOffersRequest = () => ({
  type: ActionType.LoadOffersRequest,
} as const);

export const loadOffersSuccess = (offers: Offer[]) => ({
  type: ActionType.LoadOffersSuccess,
  payload: offers,
} as const);

export const loadOffersFailed = () => ({
  type: ActionType.LoadOffersFailed,
} as const);

export const loadOfferRequest = () => ({
  type: ActionType.LoadOfferRequest,
} as const);

export const loadOfferSuccess = (offer: Offer) => ({
  type: ActionType.LoadOfferSuccess,
  payload: offer,
} as const);

export const loadOfferFailed = () => ({
  type: ActionType.LoadOfferFailed,
} as const);

export const loadNearbyOffersRequest = () => ({
  type: ActionType.LoadNearbyOffersRequest,
} as const);

export const loadNearbyOffersSuccess = (offers: Offer[]) => ({
  type: ActionType.LoadNearbyOffersSuccess,
  payload: offers,
} as const);

export const loadNearbyOffersFailed = () => ({
  type: ActionType.LoadNearbyOffersFailed,
} as const);

export const loadReviewsRequest = () => ({
  type: ActionType.LoadReviewsRequest,
} as const);

export const loadReviewsSuccess = (reviews: Review[]) => ({
  type: ActionType.LoadReviewsSuccess,
  payload: reviews,
} as const);

export const loadReviewsFailed = () => ({
  type: ActionType.LoadReviewsFailed,
} as const);

export const dropRoomData = () => ({
  type: ActionType.DropRoomData,
} as const);

export const postReviewRequest = () => ({
  type: ActionType.PostReviewRequest,
} as const);

export const postReviewSuccess = (reviews: Review[]) => ({
  type: ActionType.PostReviewSuccess,
  payload: reviews,
} as const);

export const postReviewFailed = () => ({
  type: ActionType.PostReviewFailed,
} as const);

export const resetPostReview = () => ({
  type: ActionType.ResetPostReview,
} as const);

export const saveCurrentUser = (user: CurrentUser) => ({
  type: ActionType.SaveCurrentUser,
  payload: user,
} as const);

export const dropCurrentUser = () => ({
  type: ActionType.DropCurrentUser,
} as const);

export const checkAuthRequest = () => ({
  type: ActionType.CheckAuthRequest,
} as const);

export const checkAuthSuccess = (authStatus: AuthorizationStatus) => ({
  type: ActionType.CheckAuthSuccess,
  payload: authStatus,
} as const);

export const checkAuthFailed = () => ({
  type: ActionType.CheckAuthFailed,
} as const);

export const requireAuthorizationRequest = () => ({
  type: ActionType.RequireAuthorizationRequest,
} as const);

export const requireAuthorizationSuccess = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorizationSuccess,
  payload: authStatus,
} as const);

export const requireAuthorizationFailed = () => ({
  type: ActionType.RequireAuthorizationFailed,
} as const);

export const requireLogoutRequest = () => ({
  type: ActionType.RequireLogoutRequest,
} as const);

export const requireLogoutSuccess = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireLogoutSuccess,
  payload: authStatus,
} as const);

export const requireLogoutFailed = () => ({
  type: ActionType.RequireLogoutFailed,
} as const);
