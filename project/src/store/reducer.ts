import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {SortingOption} from '../const';

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
  offers: [],
};

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, currentCityName: action.payload};
    case ActionType.CreateOffersList:
      return {...state, offers: action.payload};
    case ActionType.SelectSortingOption:
      return {...state, currentSorting: action.payload};
    default:
      return state;
  }
};

export {reducer};
