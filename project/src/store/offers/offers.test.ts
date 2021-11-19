import {Offers} from '../../types/state';
import {FetchStatus} from '../../const';
import {offers} from './offers';
import {makeFakeOffer} from '../../utils/mocks';
import {ActionType} from '../../types/action';

const initialState: Offers = {
  offers: [],
  offersStatus: FetchStatus.Idle,
  offer: null,
  offerStatus: FetchStatus.Idle,
  nearbyOffers: [],
  nearbyOffersStatus: FetchStatus.Idle,
};

const offerA = makeFakeOffer();
const offerB = makeFakeOffer();
const offerBWithFavorite = {...offerB, isFavorite: true};
const offerBWithoutFavorite = {...offerB, isFavorite: false};
const fakeOffers = [offerA, offerB];

describe('Reducer: offers', () => {
  it('без дополнительных параметров возвращает initial state', () => {
    expect(offers(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('статус загрузки предложений должен стать Loading', () => {
    const state = {
      ...initialState,
      offersStatus: FetchStatus.Idle,
    };
    const loadOffersRequestAction = {type: ActionType.LoadOffersRequest};

    expect(offers(state, loadOffersRequestAction))
      .toEqual({
        ...initialState,
        offersStatus: FetchStatus.Loading,
      });
  });

  it('статус загрузки предложений должен стать Success, а список предложений обновиться', () => {
    const state = {
      ...initialState,
      offersStatus: FetchStatus.Loading,
    };
    const loadOffersSuccessAction = {
      type: ActionType.LoadOffersSuccess,
      payload: fakeOffers,
    };

    expect(offers(state, loadOffersSuccessAction))
      .toEqual({
        ...initialState,
        offersStatus: FetchStatus.Success,
        offers: fakeOffers,
      });
  });

  it('статус загрузки предложений должен стать Failed', () => {
    const state = {
      ...initialState,
      offersStatus: FetchStatus.Loading,
    };
    const loadOffersFailedAction = {
      type: ActionType.LoadOffersFailed,
    };

    expect(offers(state, loadOffersFailedAction))
      .toEqual({
        ...initialState,
        offersStatus: FetchStatus.Failed,
      });
  });

  it('статус загрузки предложения должен стать Loading', () => {
    const state = {
      ...initialState,
      offerStatus: FetchStatus.Idle,
    };
    const loadOfferRequestAction = {
      type: ActionType.LoadOfferRequest,
    };

    expect(offers(state, loadOfferRequestAction))
      .toEqual({
        ...initialState,
        offerStatus: FetchStatus.Loading,
      });
  });

  it('статус загрузки предложения должен стать Success, а предложение обновиться', () => {
    const state = {
      ...initialState,
      offerStatus: FetchStatus.Loading,
    };
    const loadOfferSuccessAction = {
      type: ActionType.LoadOfferSuccess,
      payload: offerA,
    };

    expect(offers(state, loadOfferSuccessAction))
      .toEqual({
        ...initialState,
        offerStatus: FetchStatus.Success,
        offer: offerA,
      });
  });

  it('статус загрузки предложения должен стать Failed', () => {
    const state = {
      ...initialState,
      offerStatus: FetchStatus.Loading,
    };
    const loadOfferFailedAction = {
      type: ActionType.LoadOfferFailed,
    };

    expect(offers(state, loadOfferFailedAction))
      .toEqual({
        ...initialState,
        offerStatus: FetchStatus.Failed,
      });
  });

  it('статус загрузки предложений поблизости должен стать Loading', () => {
    const state = {
      ...initialState,
      nearbyOffersStatus: FetchStatus.Idle,
    };
    const loadNearbyOffersRequestAction = {
      type: ActionType.LoadNearbyOffersRequest,
    };

    expect(offers(state, loadNearbyOffersRequestAction))
      .toEqual({
        ...initialState,
        nearbyOffersStatus: FetchStatus.Loading,
      });
  });

  it('статус загрузки предложений поблизости должен стать Success, а список предложений обновиться', () => {
    const state = {
      ...initialState,
      nearbyOffersStatus: FetchStatus.Loading,
    };
    const loadNearbyOffersSuccessAction = {
      type: ActionType.LoadNearbyOffersSuccess,
      payload: fakeOffers,
    };

    expect(offers(state, loadNearbyOffersSuccessAction))
      .toEqual({
        ...initialState,
        nearbyOffersStatus: FetchStatus.Success,
        nearbyOffers: fakeOffers,
      });
  });

  it('статус загрузки предложений поблизости должен стать Failed', () => {
    const state = {
      ...initialState,
      nearbyOffersStatus: FetchStatus.Loading,
    };
    const loadNearbyOffersFailedAction = {
      type: ActionType.LoadNearbyOffersFailed,
    };

    expect(offers(state, loadNearbyOffersFailedAction))
      .toEqual({
        ...initialState,
        nearbyOffersStatus: FetchStatus.Failed,
      });
  });

  it('предложения относящиеся к странице room сбрасываются вместе со статусами загрузки', () => {
    const state = {
      ...initialState,
      offer: offerA,
      offerStatus: FetchStatus.Success,
      nearbyOffers: fakeOffers,
      nearbyOffersStatus: FetchStatus.Success,
    };
    const dropRoomOffersDataAction = {
      type: ActionType.DropRoomOffersData,
    };

    expect(offers(state, dropRoomOffersDataAction))
      .toEqual({
        ...initialState,
        offer: null,
        offerStatus: FetchStatus.Idle,
        nearbyOffers: [],
        nearbyOffersStatus: FetchStatus.Idle,
      });
  });

  it('статус isFavorite изменяется у конкретного предложения в списке предложений, и у предложения на странице по необходимости', () => {
    const state = {
      ...initialState,
      offers: [offerA, offerBWithFavorite],
      offer: offerBWithFavorite,
    };
    const replaceOfferAction = {
      type: ActionType.ReplaceOffer,
      payload: offerBWithoutFavorite,
    };

    expect(offers(state, replaceOfferAction))
      .toEqual({
        ...initialState,
        offers: [offerA, offerBWithoutFavorite],
        offer: offerBWithoutFavorite,
      });
  });
});
