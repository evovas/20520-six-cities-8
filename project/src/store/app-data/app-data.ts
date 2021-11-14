import {AppData} from '../../types/state';
import {FetchStatus} from '../../const';
import {Actions, ActionType} from '../../types/action';

const initialState: AppData = {
  offers: [],
  offersStatus: FetchStatus.Idle,
  offer: null,
  offerStatus: FetchStatus.Idle,
  nearbyOffers: [],
  nearbyOffersStatus: FetchStatus.Idle,
  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewPostStatus: FetchStatus.Idle,
};

const appData = (state = initialState, action: Actions): AppData => {
  switch (action.type) {
    case ActionType.LoadOffersRequest: {
      return {...state, offersStatus: FetchStatus.Loading};
    }
    case ActionType.LoadOffersSuccess: {
      const offers = action.payload;
      return {
        ...state,
        offers,
        offersStatus: FetchStatus.Success,
      };
    }
    case ActionType.LoadOffersFailed: {
      return {...state, offersStatus: FetchStatus.Failed};
    }
    case ActionType.LoadOfferRequest: {
      return {...state, offerStatus: FetchStatus.Loading};
    }
    case ActionType.LoadOfferSuccess: {
      const offer = action.payload;
      return {
        ...state,
        offer,
        offerStatus: FetchStatus.Success,
      };
    }
    case ActionType.LoadOfferFailed: {
      return {...state, offerStatus: FetchStatus.Failed};
    }
    case ActionType.LoadNearbyOffersRequest: {
      return {...state, nearbyOffersStatus: FetchStatus.Loading};
    }
    case ActionType.LoadNearbyOffersSuccess: {
      const nearbyOffers = action.payload;
      return {
        ...state,
        nearbyOffers,
        nearbyOffersStatus: FetchStatus.Success,
      };
    }
    case ActionType.LoadNearbyOffersFailed: {
      return {...state, nearbyOffersStatus: FetchStatus.Failed};
    }
    case ActionType.LoadReviewsRequest: {
      return {...state, reviewsStatus: FetchStatus.Loading};
    }
    case ActionType.LoadReviewsSuccess: {
      const reviews = action.payload;
      return {
        ...state,
        reviews,
        reviewsStatus: FetchStatus.Success,
      };
    }
    case ActionType.LoadReviewsFailed: {
      return {...state, reviewsStatus: FetchStatus.Failed};
    }
    case ActionType.DropRoomData: {
      return {
        ...state,
        offer: null,
        offerStatus: FetchStatus.Idle,
        nearbyOffers: [],
        nearbyOffersStatus: FetchStatus.Idle,
        reviews: [],
        reviewsStatus: FetchStatus.Idle,
      };
    }
    case ActionType.PostReviewRequest: {
      return {...state, reviewPostStatus: FetchStatus.Loading};
    }
    case ActionType.PostReviewSuccess: {
      const reviews = action.payload;
      return {
        ...state,
        reviews,
        reviewPostStatus: FetchStatus.Success,
      };
    }
    case ActionType.PostReviewFailed: {
      return {...state, reviewPostStatus: FetchStatus.Failed};
    }
    case ActionType.ResetPostReview: {
      return {...state, reviewPostStatus: FetchStatus.Idle};
    }
    default:
      return state;
  }
};

export {appData};
