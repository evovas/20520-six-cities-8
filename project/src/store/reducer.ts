import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  offers: [],
};

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, currentCityName: action.payload};
    case ActionType.ProcessOffers:
      return {...state, offers: action.payload};
    default:
      return state;
  }
};

export {reducer};
