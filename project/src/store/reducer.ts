import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, FetchState, SortingOption} from '../const';

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
  offers: [],
  offersLoading: FetchState.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, currentCityName: action.payload};
    case ActionType.SelectSortingOption:
      return {...state, currentSorting: action.payload};
    case ActionType.LoadOffersRequest: {
      return {...state, offersLoading: FetchState.Loading};
    }
    case ActionType.LoadOffersSuccess: {
      const offers = action.payload;
      return {
        ...state,
        offers,
        offersLoading: FetchState.Success,
      };
    }
    case ActionType.LoadOffersFailed: {
      return {...state, offersLoading: FetchState.Failed};
    }
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    default:
      return state;
  }
};

export {reducer};
