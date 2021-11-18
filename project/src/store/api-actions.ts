import {toast} from 'react-toastify';
import {ThunkActionResult} from '../types/action';
import {CurrentUserServer, ReviewPost, ServerFavoriteStatus, ServerOffer, ServerReview} from '../types/data';
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
  requireLogoutSuccess,
  saveCurrentUser,
  dropCurrentUser,
  setFavoriteOptionRequest,
  setFavoriteOptionSuccess,
  setFavoriteOptionFailed,
  replaceOffer,
  loadFavoriteOffersRequest,
  loadFavoriteOffersSuccess,
  loadFavoriteOffersFailed, deleteFavoriteOffer
} from './action';
import {adaptCurrentUserToClient, adaptOfferToClient, adaptReviewToClient} from '../services/adapter';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';

const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const FAIL_MESSAGE = 'An error occurred, please try later';
const REVIEWS_FAIL_MESSAGE = 'An error occurred while loading comments, please try again later.';
const NEARBY_PLACES_FAIL_MESSAGE = 'There was an error loading places nearby, please try again later.';

export const postFavoriteOptionAction = (id: number, status: ServerFavoriteStatus): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(setFavoriteOptionRequest());
    try {
      const {data} = await api.post<ServerOffer>(`${APIRoute.Favorite}/${id}/${status}`);
      const offer = adaptOfferToClient(data);
      dispatch(setFavoriteOptionSuccess());
      dispatch(replaceOffer(offer));
      dispatch(deleteFavoriteOffer(offer));
    } catch (e) {
      dispatch(setFavoriteOptionFailed());
      toast.info(FAIL_MESSAGE);
    }
  }
);

export const fetchFavoriteOffersAction = (): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadFavoriteOffersRequest());
    try {
      const {data} = await api.get<ServerOffer[]>(APIRoute.Favorite);
      dispatch(loadFavoriteOffersSuccess(data.map((offer) => adaptOfferToClient(offer))));
    } catch (e) {
      dispatch(loadFavoriteOffersFailed());
    }
  }
);

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
      (e === NOT_FOUND_CODE)
        ? dispatch(loadOfferSuccess(null))
        : dispatch(loadOfferFailed());
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
      if (e !== NOT_FOUND_CODE) {
        toast.info(NEARBY_PLACES_FAIL_MESSAGE);
      }
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
      if (e !== BAD_REQUEST_CODE) {
        toast.info(REVIEWS_FAIL_MESSAGE);
      }
    }
  }
);

export const postReviewAction = (pageId: string, {comment, rating}: ReviewPost): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
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
      const {data} = await api.get(APIRoute.Login);
      dispatch(checkAuthSuccess(AuthorizationStatus.Auth));
      dispatch(saveCurrentUser(adaptCurrentUserToClient(data)));
    } catch (e) {
      dispatch(checkAuthFailed());
      dispatch(dropCurrentUser());
      dropToken();
    }
  }
);

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(requireAuthorizationRequest());
    try {
      const {data} = await api.post<CurrentUserServer>(APIRoute.Login, {email, password});
      const {token} = data;
      saveToken(token);
      dispatch(requireAuthorizationSuccess());
      dispatch(saveCurrentUser(adaptCurrentUserToClient(data)));
    } catch (e) {
      dispatch(requireAuthorizationFailed());
      toast.info(FAIL_MESSAGE);
    }
  }
);

export const logoutAction = (): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(requireLogoutRequest());
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogoutSuccess());
      dispatch(dropCurrentUser());
    } catch (e) {
      dispatch(requireLogoutFailed());
      toast.info(FAIL_MESSAGE);
    }
  }
);
