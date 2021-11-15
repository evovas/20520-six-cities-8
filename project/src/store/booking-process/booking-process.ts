import {createReducer} from '@reduxjs/toolkit';
import {BookingProcess} from '../../types/state';
import {FetchStatus, SortingOption} from '../../const';
import {
  resetFavoriteOption,
  selectCity,
  selectSortingOption,
  setFavoriteOptionFailed,
  setFavoriteOptionRequest,
  setFavoriteOptionSuccess
} from '../action';

const DEFAULT_CITY = 'Paris';

const initialState: BookingProcess = {
  currentCityName: DEFAULT_CITY,
  currentSorting: SortingOption.Popular,
  favoriteOptionStatus: FetchStatus.Idle,
  favoriteOptionOffer: null,
};

const bookingProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.currentCityName = action.payload;
    })
    .addCase(selectSortingOption, (state, action) => {
      state.currentSorting = action.payload;
    })
    .addCase(setFavoriteOptionRequest, (state) => {
      state.favoriteOptionStatus = FetchStatus.Loading;
    })
    .addCase(setFavoriteOptionSuccess, (state, action) => {
      state.favoriteOptionStatus = FetchStatus.Success;
      state.favoriteOptionOffer = action.payload;
    })
    .addCase(setFavoriteOptionFailed, (state) => {
      state.favoriteOptionStatus = FetchStatus.Failed;
    })
    .addCase(resetFavoriteOption, (state) => {
      state.favoriteOptionStatus = FetchStatus.Idle;
      state.favoriteOptionOffer = null;
    });
});

export {bookingProcess};
