import {Favorites} from '../../types/state';
import {FetchStatus} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {
  resetFavoriteOption,
  setFavoriteOptionFailed,
  setFavoriteOptionRequest,
  setFavoriteOptionSuccess
} from '../action';

const initialState: Favorites = {
  favoriteOptionStatus: FetchStatus.Idle,
  favoriteOptionOffer: null,
};

const favorites = createReducer(initialState, (builder) => {
  builder
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

export {favorites};
