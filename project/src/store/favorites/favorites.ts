import {createReducer} from '@reduxjs/toolkit';
import {Favorites} from '../../types/state';
import {FetchStatus} from '../../const';
import {
  deleteFavoriteOffer,
  dropFavoriteOffers,
  loadFavoriteOffersFailed,
  loadFavoriteOffersRequest,
  loadFavoriteOffersSuccess,
  setFavoriteOptionFailed,
  setFavoriteOptionRequest,
  setFavoriteOptionSuccess
} from '../action';

const initialState: Favorites = {
  favoriteOptionStatus: FetchStatus.Idle,
  favoriteOffersStatus: FetchStatus.Idle,
  favoriteOffers: [],
};

const favorites = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavoriteOptionRequest, (state) => {
      state.favoriteOptionStatus = FetchStatus.Loading;
    })
    .addCase(setFavoriteOptionSuccess, (state) => {
      state.favoriteOptionStatus = FetchStatus.Success;
    })
    .addCase(setFavoriteOptionFailed, (state) => {
      state.favoriteOptionStatus = FetchStatus.Failed;
    })
    .addCase(loadFavoriteOffersRequest, (state) => {
      state.favoriteOffersStatus = FetchStatus.Loading;
    })
    .addCase(loadFavoriteOffersSuccess, (state, action) => {
      state.favoriteOffersStatus = FetchStatus.Success;
      state.favoriteOffers = action.payload;
    })
    .addCase(loadFavoriteOffersFailed, (state) => {
      state.favoriteOffersStatus = FetchStatus.Failed;
    })
    .addCase(dropFavoriteOffers, (state) => {
      state.favoriteOffersStatus = FetchStatus.Idle;
      state.favoriteOffers = [];
    })
    .addCase(deleteFavoriteOffer, (state, action) => {
      state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
    });
});

export {favorites};
