import {BookingProcess} from '../../types/state';
import {SortingOption} from '../../const';
import {Actions, ActionType} from '../../types/action';

const DEFAULT_CITY = 'Paris';

const initialState: BookingProcess = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
};

const bookingProcess = (state = initialState, action: Actions): BookingProcess => {
  switch (action.type) {
    case ActionType.SelectCity: {
      return {...state, currentCityName: action.payload};
    }
    case ActionType.SelectSortingOption: {
      return {...state, currentSorting: action.payload};
    }
    default:
      return state;
  }
};

export {bookingProcess};
