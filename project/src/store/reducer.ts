import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, SortingOption} from '../const';

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
  offers: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, currentCityName: action.payload};
    case ActionType.SelectSortingOption:
      return {...state, currentSorting: action.payload};
    case ActionType.LoadOffers: {
      const offers = action.payload;
      return {
        ...state,
        offers,
        isDataLoaded: true,
      };
    }
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    default:
      return state;
  }
};

export {reducer};
