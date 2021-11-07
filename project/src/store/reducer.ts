import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, FetchStatus, SortingOption} from '../const';

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
  offers: [],
  offersStatus: FetchStatus.Idle,
  offer: null,
  offerStatus: FetchStatus.Idle,
  nearbyOffers: [],
  nearbyOffersStatus: FetchStatus.Idle,
  comments: [],
  commentsStatus: FetchStatus.Idle,
  checkAuthStatus: FetchStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationRequestStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity: {
      return {...state, currentCityName: action.payload};
    }
    case ActionType.SelectSortingOption: {
      return {...state, currentSorting: action.payload};
    }
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
    case ActionType.LoadCommentsRequest: {
      return {...state, commentsStatus: FetchStatus.Loading};
    }
    case ActionType.LoadCommentsSuccess: {
      const comments = action.payload;
      return {
        ...state,
        comments,
        commentsStatus: FetchStatus.Success,
      };
    }
    case ActionType.LoadCommentsFailed: {
      return {...state, commentsStatus: FetchStatus.Failed};
    }
    case ActionType.CheckAuthRequest: {
      return {...state, checkAuthStatus: FetchStatus.Loading};
    }
    case ActionType.CheckAuthSuccess: {
      return {
        ...state,
        checkAuthStatus: FetchStatus.Success,
        authorizationStatus: action.payload,
      };
    }
    case ActionType.CheckAuthFailed: {
      return {...state, checkAuthStatus: FetchStatus.Failed};
    }
    case ActionType.RequireAuthorizationRequest: {
      return {...state, authorizationRequestStatus: FetchStatus.Loading};
    }
    case ActionType.RequireAuthorizationSuccess: {
      return {
        ...state, authorizationRequestStatus:
        FetchStatus.Success,
        authorizationStatus: action.payload,
      };
    }
    case ActionType.RequireAuthorizationFailed: {
      return {...state, authorizationRequestStatus: FetchStatus.Failed};
    }
    case ActionType.RequireLogoutRequest: {
      return {...state, logoutStatus: FetchStatus.Loading};
    }
    case ActionType.RequireLogoutSuccess: {
      return {...state,
        logoutStatus: FetchStatus.Success,
        authorizationStatus: action.payload,
      };
    }
    case ActionType.RequireLogoutFailed: {
      return {...state, logoutStatus: FetchStatus.Failed};
    }
    default:
      return state;
  }
};

export {reducer};
