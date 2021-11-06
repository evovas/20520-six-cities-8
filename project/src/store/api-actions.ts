import {ThunkActionResult} from '../types/action';
import {ServerOffer} from '../types/data';
import {APIRoute, AuthorizationStatus} from '../const';
import {
  checkAuthFailed,
  checkAuthRequest,
  checkAuthSuccess,
  loadOffersFailed,
  loadOffersRequest,
  loadOffersSuccess,
  requireAuthorizationFailed,
  requireAuthorizationRequest,
  requireAuthorizationSuccess,
  requireLogoutFailed,
  requireLogoutRequest,
  requireLogoutSuccess,
} from './action';
import {adaptOfferToClient} from '../services/adapter';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken, Token} from '../services/token';

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
      dispatch(requireLogoutSuccess(AuthorizationStatus.NoAuth));
      console.log(5);
    } catch (e) {
      dispatch(requireLogoutFailed());
    }
  }
);
