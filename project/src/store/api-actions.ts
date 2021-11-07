import {toast} from 'react-toastify';
import {ThunkActionResult} from '../types/action';
import {ReviewPost, ServerOffer, ServerReview} from '../types/data';
import {APIRoute, AuthorizationStatus} from '../const';
import {
  checkAuthFailed,
  checkAuthRequest,
  checkAuthSuccess,
  loadReviewsFailed,
  loadReviewsRequest,
  loadReviewsSuccess,
  postReviewRequest,
  postReviewSuccess,
  postReviewFailed,
  loadNearbyOffersFailed,
  loadNearbyOffersRequest,
  loadNearbyOffersSuccess,
  loadOfferFailed,
  loadOfferRequest,
  loadOffersFailed,
  loadOffersRequest,
  loadOffersSuccess,
  loadOfferSuccess,
  requireAuthorizationFailed,
  requireAuthorizationRequest,
  requireAuthorizationSuccess,
  requireLogoutFailed,
  requireLogoutRequest,
  requireLogoutSuccess
} from './action';
import {adaptOfferToClient, adaptReviewToClient} from '../services/adapter';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken, Token} from '../services/token';

const FAIL_MESSAGE = 'An error occurred, please try later';

export const fetchOffersAction = (): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadOffersRequest());
    try {
      const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
      dispatch(loadOffersSuccess(data.map((offer) => adaptOfferToClient(offer))));
    } catch (e) {
      dispatch(loadOffersFailed());
    }
  }
);

export const fetchOfferAction = (pageId: string): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadOfferRequest());
    try {
      const {data} = await api.get<ServerOffer>(`${APIRoute.Offers}/${pageId}`);
      dispatch(loadOfferSuccess(adaptOfferToClient(data)));
    } catch (e) {
      dispatch(loadOfferFailed());
    }
  }
);

export const fetchNearbyOffersAction = (pageId: string): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadNearbyOffersRequest());
    try {
      const {data} = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${pageId}${APIRoute.Nearby}`);
      dispatch(loadNearbyOffersSuccess(data.map((offer) => adaptOfferToClient(offer))));
    } catch (e) {
      dispatch(loadNearbyOffersFailed());
    }
  }
);

export const fetchReviewsAction = (pageId: string): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadReviewsRequest());
    try {
      const {data} = await api.get<ServerReview[]>(`${APIRoute.Comments}/${pageId}`);
      dispatch(loadReviewsSuccess(data.map((review) => adaptReviewToClient(review))));
    } catch (e) {
      dispatch(loadReviewsFailed());
    }
  }
);

export const postReviewAction = (pageId: string, {comment, rating}: ReviewPost): ThunkActionResult => (
  async (dispatch, _, api) => {
    dispatch(postReviewRequest());
    try {
      const {data} = await api.post<ServerReview[]>(`${APIRoute.Comments}/${pageId}`, {comment, rating});
      dispatch(postReviewSuccess(data.map((review) => adaptReviewToClient(review))));
    } catch (e) {
      dispatch(postReviewFailed());
      toast.info(FAIL_MESSAGE);
    }
  }
);

export const checkAuthAction = (): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(checkAuthRequest());
    try {
      await api.get(APIRoute.Login);
      dispatch(checkAuthSuccess(AuthorizationStatus.Auth));
    } catch (e) {
      dispatch(checkAuthFailed());
    }
  }
);

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult => (
  async (dispatch, _, api) => {
    dispatch(requireAuthorizationRequest());
    try {
      const {data: {token}} = await api.post<{ token: Token }>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorizationSuccess(AuthorizationStatus.Auth));
    } catch (e) {
      dispatch(requireAuthorizationFailed());
      toast.info(FAIL_MESSAGE);
    }
  }
);

export const logoutAction = (): ThunkActionResult => (
  async (dispatch, _, api) => {
    dispatch(requireLogoutRequest());
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogoutSuccess(AuthorizationStatus.NoAuth));
    } catch (e) {
      dispatch(requireLogoutFailed());
    }
  }
);
