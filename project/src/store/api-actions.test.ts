import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  checkAuthAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  postFavoriteOptionAction,
  postReviewAction
} from './api-actions';
import {
  checkAuthRequest,
  checkAuthSuccess,
  deleteFavoriteOffer,
  loadFavoriteOffersRequest,
  loadFavoriteOffersSuccess,
  loadNearbyOffersRequest,
  loadNearbyOffersSuccess,
  loadOfferRequest,
  loadOffersRequest,
  loadOffersSuccess,
  loadOfferSuccess,
  loadReviewsRequest,
  loadReviewsSuccess,
  postReviewRequest,
  postReviewSuccess,
  replaceOffer,
  saveCurrentUser,
  setFavoriteOptionRequest,
  setFavoriteOptionSuccess
} from './action';
import {
  adaptCurrentUserToClient,
  adaptOfferToClient,
  adaptReviewToClient
} from '../services/adapter';
import {
  makeFakeCurrentUserServer,
  makeFakeReviewPost,
  makeFakeServerOffer,
  makeFakeServerReview
} from '../utils/mocks';
import {APIRoute, AuthorizationStatus} from '../const';
import {State} from '../types/state';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch setFavoriteOptionSuccess, replaceOffer, deleteFavoriteOffer when POST /favorite/:id/status', async () => {
    const fakeServerOffer = makeFakeServerOffer();
    const id = fakeServerOffer.id;
    const newStatus = Number(!fakeServerOffer['is_favorite']);

    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${newStatus}`)
      .reply(200, fakeServerOffer);

    const store = mockStore();
    await store.dispatch(postFavoriteOptionAction(id, newStatus));

    const fakeOffer = adaptOfferToClient(fakeServerOffer);

    expect(store.getActions()).toEqual([
      setFavoriteOptionRequest(),
      setFavoriteOptionSuccess(),
      replaceOffer(fakeOffer),
      deleteFavoriteOffer(fakeOffer),
    ]);
  });

  it('should dispatch loadFavoriteOffersRequest and loadFavoriteOffersSuccess, when GET /favorite', async () => {
    const fakeServerOffers = [makeFakeServerOffer(), makeFakeServerOffer()];

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeServerOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoriteOffersAction());

    expect(store.getActions()).toEqual([
      loadFavoriteOffersRequest(),
      loadFavoriteOffersSuccess(fakeServerOffers.map((offer) => adaptOfferToClient(offer))),
    ]);
  });

  it('should dispatch loadOffersRequest and loadOffersSuccess, when GET /offers', async () => {
    const fakeServerOffers = [makeFakeServerOffer(), makeFakeServerOffer()];

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeServerOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      loadOffersRequest(),
      loadOffersSuccess(fakeServerOffers.map((offer) => adaptOfferToClient(offer))),
    ]);
  });

  it('should dispatch loadOfferRequest and loadOfferSuccess, when GET /offers/:id', async () => {
    const fakeServerOffer = makeFakeServerOffer();
    const id = fakeServerOffer.id;

    mockAPI
      .onGet(`${APIRoute.Offers}/${id}`)
      .reply(200, fakeServerOffer);

    const store = mockStore();
    await store.dispatch(fetchOfferAction(id.toString()));

    expect(store.getActions()).toEqual([
      loadOfferRequest(),
      loadOfferSuccess(adaptOfferToClient(fakeServerOffer)),
    ]);
  });

  it('should dispatch loadNearbyOffersRequest and loadNearbyOffersSuccess, when GET /offers/:id/nearby', async () => {
    const fakeServerOffers = [makeFakeServerOffer(), makeFakeServerOffer()];
    const PAGE_ID = '5';

    mockAPI
      .onGet(`${APIRoute.Offers}/${PAGE_ID}${APIRoute.Nearby}`)
      .reply(200, fakeServerOffers);

    const store = mockStore();
    await store.dispatch(fetchNearbyOffersAction(PAGE_ID));

    expect(store.getActions()).toEqual([
      loadNearbyOffersRequest(),
      loadNearbyOffersSuccess(fakeServerOffers.map((offer) => adaptOfferToClient(offer))),
    ]);
  });

  it('should dispatch loadReviewsRequest and loadReviewsSuccess, when GET /comments/:id', async () => {
    const fakeServerReviews = [makeFakeServerReview(), makeFakeServerReview()];
    const PAGE_ID = '5';

    mockAPI
      .onGet(`${APIRoute.Comments}/${PAGE_ID}`)
      .reply(200, fakeServerReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(PAGE_ID));

    expect(store.getActions()).toEqual([
      loadReviewsRequest(),
      loadReviewsSuccess(fakeServerReviews.map((review) => adaptReviewToClient(review))),
    ]);
  });

  it('should dispatch postReviewRequest and postReviewSuccess, when POST /comments/:id', async () => {
    const fakeServerReviews = [makeFakeServerReview(), makeFakeServerReview()];
    const fakeReviewPost = makeFakeReviewPost();
    const PAGE_ID = '5';

    mockAPI
      .onPost(`${APIRoute.Comments}/${PAGE_ID}`, fakeReviewPost)
      .reply(200, fakeServerReviews);

    const store = mockStore();
    await store.dispatch(postReviewAction(PAGE_ID, fakeReviewPost));

    expect(store.getActions()).toEqual([
      postReviewRequest(),
      postReviewSuccess(fakeServerReviews.map((review) => adaptReviewToClient(review))),
    ]);
  });

  it('should authorization status is «auth» and save user when server return 200', async () => {
    const fakeServerUser = makeFakeCurrentUserServer();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeServerUser);

    const store = mockStore();
    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      checkAuthRequest(),
      checkAuthSuccess(AuthorizationStatus.Auth),
      saveCurrentUser(adaptCurrentUserToClient(fakeServerUser)),
    ]);
  });
});
