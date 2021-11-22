import {makeFakeOffer} from '../../utils/mocks';
import {FetchStatus} from '../../const';
import {ActionType} from '../../types/action';
import {offers} from './offers';
import {Offers} from '../../types/state';

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
  it('returns initial state without additional parameters', () => {
    expect(offers(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('offersStatus should become Loading', () => {
    const state = {
      ...initialState,
    };
    const loadOffersRequestAction = {type: ActionType.LoadOffersRequest};

    expect(offers(state, loadOffersRequestAction))
      .toEqual({
        ...initialState,
        offersStatus: FetchStatus.Loading,
      });
  });

  it('offersStatus should become Success, and the list of offers to be updated', () => {
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

  it('offersStatus should become Failed', () => {
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

  it('offerStatus should become Loading', () => {
    const state = {
      ...initialState,
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

  it('offerStatus should become Success, and the offer to be updated', () => {
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

  it('offerStatus should become Failed', () => {
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

  it('nearbyOffersStatus should become Loading', () => {
    const state = {
      ...initialState,
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

  it('nearbyOffersStatus should become Success, and the list of offers to be updated', () => {
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

  it('nearbyOffersStatus should become Failed', () => {
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

  it('offers related to the room page are reset along with the loading statuses', () => {
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

  it('the isFavorite status changes for a specific offer in the offer list, and for an offer on the page as needed', () => {
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
