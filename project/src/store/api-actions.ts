import {toast} from 'react-toastify';
import {ThunkActionResult} from '../types/action';
import {ServerReview, ServerOffer} from '../types/data';
import {APIRoute, AuthorizationStatus} from '../const';
import {
  checkAuthFailed,
  checkAuthRequest,
  checkAuthSuccess,
  loadOffersFailed,
  loadOffersRequest,
  loadOffersSuccess,
  loadOfferRequest,
  loadOfferSuccess,
  loadOfferFailed,
  loadNearbyOffersRequest,
  loadNearbyOffersSuccess,
  loadNearbyOffersFailed,
  loadCommentsRequest,
  loadCommentsSuccess,
  loadCommentsFailed,
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

const AUTH_FAIL_MESSAGE = 'An error occurred, please try later';

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

export const fetchOfferAction = (pageID: string): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadOfferRequest());
    try {
      const {data} = await api.get<ServerOffer>(`${APIRoute.Offers}/${pageID}`);
      dispatch(loadOfferSuccess(adaptOfferToClient(data)));
    } catch (e) {
      dispatch(loadOfferFailed());
    }
  }
);

export const fetchNearbyOffersAction = (pageID: string): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadNearbyOffersRequest());
    try {
      const {data} = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${pageID}/${APIRoute.Nearby}`);
      dispatch(loadNearbyOffersSuccess(data.map((offer) => adaptOfferToClient(offer))));
    } catch (e) {
      dispatch(loadNearbyOffersFailed());
    }
  }
);

export const fetchCommentsAction = (pageID: string): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadCommentsRequest());
    try {
      const {data} = await api.get<ServerReview[]>(`${APIRoute.Comments}/${pageID}`);
      dispatch(loadCommentsSuccess(data.map((review) => adaptReviewToClient(review))));
    } catch (e) {
      dispatch(loadCommentsFailed());
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
      toast.info(AUTH_FAIL_MESSAGE);
    }
  }
);

export const logoutAction = (): ThunkActionResult => (
  async (dispatch, _, api) => {
    dispatch(requireLogoutRequest());
    try {
      console.log(1);
      await api.delete(APIRoute.Logout);
      console.log(2);
      dropToken();
      console.log(3);
      dispatch(requireLogoutSuccess());
      console.log(5);
    } catch (e) {
      dispatch(requireLogoutFailed());
    }
  }
);
