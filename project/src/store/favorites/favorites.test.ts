import {favorites} from './favorites';
import {FetchStatus} from '../../const';
import {ActionType} from '../../types/action';
import {makeFakeOffer} from '../../utils/mocks';
import {Favorites} from '../../types/state';

const initialState: Favorites = {
  favoriteOptionStatus: FetchStatus.Idle,
  favoriteOffersStatus: FetchStatus.Idle,
  favoriteOffers: [],
};
const offerA = makeFakeOffer();
const offerB = makeFakeOffer();
const offers = [offerA, offerB];

describe('Reducer: favorites', () => {
  it('без дополнительных параметров возвращает initial state', () => {
    expect(favorites(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('статус изменения флага избранного должен стать Loading', () => {
    const state = {
      ...initialState,
      favoriteOptionStatus: FetchStatus.Idle,
    };
    const setFavoriteOptionRequestAction = {
      type: ActionType.SetFavoriteOptionRequest,
    };

    expect(favorites(state, setFavoriteOptionRequestAction))
      .toEqual({
        ...initialState,
        favoriteOptionStatus: FetchStatus.Loading,
      });
  });

  it('статус изменения флага избранного должен стать Success', () => {
    const state = {
      ...initialState,
      favoriteOptionStatus: FetchStatus.Loading,
    };
    const setFavoriteOptionSuccessAction = {
      type: ActionType.SetFavoriteOptionSuccess,
    };

    expect(favorites(state, setFavoriteOptionSuccessAction))
      .toEqual({
        ...initialState,
        favoriteOptionStatus: FetchStatus.Success,
      });
  });

  it('статус изменения флага избранного должен стать Failed', () => {
    const state = {
      ...initialState,
      favoriteOptionStatus: FetchStatus.Loading,
    };
    const setFavoriteOptionFailedAction = {
      type: ActionType.SetFavoriteOptionFailed,
    };

    expect(favorites(state, setFavoriteOptionFailedAction))
      .toEqual({
        ...initialState,
        favoriteOptionStatus: FetchStatus.Failed,
      });
  });

  it('статус загрузки избранных предложений должен стать Loading', () => {
    const state = {
      ...initialState,
      favoriteOffersStatus: FetchStatus.Idle,
    };
    const loadFavoriteOffersRequestAction = {
      type: ActionType.LoadFavoriteOffersRequest,
    };

    expect(favorites(state, loadFavoriteOffersRequestAction))
      .toEqual({
        ...initialState,
        favoriteOffersStatus: FetchStatus.Loading,
      });
  });

  it('статус загрузки избранных предложений должен стать Success, а список предложений обновиться', () => {
    const state = {
      ...initialState,
      favoriteOffersStatus: FetchStatus.Loading,
    };
    const loadFavoriteOffersSuccessAction = {
      type: ActionType.LoadFavoriteOffersSuccess,
      payload: offers,
    };

    expect(favorites(state, loadFavoriteOffersSuccessAction))
      .toEqual({
        ...initialState,
        favoriteOffersStatus: FetchStatus.Success,
        favoriteOffers: offers,
      });
  });

  it('статус загрузки избранных предложений должен стать Failed', () => {
    const state = {
      ...initialState,
      favoriteOffersStatus: FetchStatus.Loading,
    };
    const loadFavoriteOffersFailedAction = {
      type: ActionType.LoadFavoriteOffersFailed,
    };

    expect(favorites(state, loadFavoriteOffersFailedAction))
      .toEqual({
        ...initialState,
        favoriteOffersStatus: FetchStatus.Failed,
      });
  });

  it('статус загрузки и список избранных должны сброситься', () => {
    const stateSuccess = {
      ...initialState,
      favoriteOffersStatus: FetchStatus.Success,
      favoriteOffers: offers,
    };

    const stateFailed = {
      ...initialState,
      favoriteOffersStatus: FetchStatus.Failed,
      favoriteOffers: [],
    };

    const dropFavoriteOffersAction = {
      type: ActionType.DropFavoriteOffers,
    };

    expect(favorites(stateSuccess, dropFavoriteOffersAction))
      .toEqual({
        ...initialState,
        favoriteOffersStatus: FetchStatus.Idle,
        favoriteOffers: [],
      });

    expect(favorites(stateFailed, dropFavoriteOffersAction))
      .toEqual({
        ...initialState,
        favoriteOffersStatus: FetchStatus.Idle,
        favoriteOffers: [],
      });
  });

  it('из списка избранного должно удалиться конкретное предложение', () => {
    const state = {
      ...initialState,
      favoriteOffers: offers,
    };

    const deleteFavoriteOfferAction = {
      type: ActionType.DeleteFavoriteOffer,
      payload: offerA,
    };

    expect(favorites(state, deleteFavoriteOfferAction))
      .toEqual({
        ...initialState,
        favoriteOffers: [offerB],
      });
  });
});
