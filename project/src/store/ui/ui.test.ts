import {SortingOption} from '../../const';
import {ActionType} from '../../types/action';
import {ui} from './ui';
import {UI} from '../../types/state';

const DEFAULT_CITY = 'Paris';
const NEW_CITY_NAME = 'Cologne';

const initialState: UI = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
};

describe('Reducer: ui', () => {
  it('returns initial state without additional parameters', () => {
    expect(ui(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('currentCityName should change to the specified city', () => {
    const state = {
      ...initialState,
    };
    const selectCityAction = {
      type: ActionType.SelectCity,
      payload: NEW_CITY_NAME,
    };

    expect(ui(state, selectCityAction))
      .toEqual({
        ...initialState,
        currentCityName: NEW_CITY_NAME,
      });
  });

  it('currentSorting should change to the specified sorting', () => {
    const state = {
      ...initialState,
    };
    const selectSortingOptionAction = {
      type: ActionType.SelectSortingOption,
      payload: SortingOption.TopRatedFirst,
    };

    expect(ui(state, selectSortingOptionAction))
      .toEqual({
        ...initialState,
        currentSorting: SortingOption.TopRatedFirst,
      });
  });
});
