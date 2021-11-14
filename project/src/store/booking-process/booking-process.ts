import {createReducer} from '@reduxjs/toolkit';
import {BookingProcess} from '../../types/state';
import {SortingOption} from '../../const';
import {selectCity, selectSortingOption} from '../action';

const DEFAULT_CITY = 'Paris';

const initialState: BookingProcess = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
};

const bookingProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.currentCityName = action.payload;
    })
    .addCase(selectSortingOption, (state, action) => {
      state.currentSorting = action.payload;
    });
});

export {bookingProcess};
