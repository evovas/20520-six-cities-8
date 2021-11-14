import {createReducer} from '@reduxjs/toolkit';
import {AppData} from '../../types/state';
import {FetchStatus} from '../../const';
import {
  dropRoomData,
  loadNearbyOffersFailed,
  loadNearbyOffersRequest,
  loadNearbyOffersSuccess,
  loadOfferFailed,
  loadOfferRequest,
  loadOffersFailed,
  loadOffersRequest,
  loadOffersSuccess,
  loadOfferSuccess,
  loadReviewsFailed,
  loadReviewsRequest,
  loadReviewsSuccess,
  postReviewFailed,
  postReviewRequest,
  postReviewSuccess,
  resetPostReview
} from '../action';

const initialState: AppData = {
  offers: [],
  offersStatus: FetchStatus.Idle,
  offer: null,
  offerStatus: FetchStatus.Idle,
  nearbyOffers: [],
  nearbyOffersStatus: FetchStatus.Idle,
  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewPostStatus: FetchStatus.Idle,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffersRequest, (state) => {
      state.offersStatus = FetchStatus.Loading;
    })
    .addCase(loadOffersSuccess, (state, action) => {
      state.offersStatus = FetchStatus.Success;
      state.offers = action.payload;
    })
    .addCase(loadOffersFailed, (state) => {
      state.offersStatus = FetchStatus.Failed;
    })
    .addCase(loadOfferRequest, (state) => {
      state.offerStatus = FetchStatus.Loading;
    })
    .addCase(loadOfferSuccess, (state, action) => {
      state.offerStatus = FetchStatus.Success;
      state.offer = action.payload;
    })
    .addCase(loadOfferFailed, (state) => {
      state.offerStatus = FetchStatus.Failed;
    })
    .addCase(loadNearbyOffersRequest, (state) => {
      state.nearbyOffersStatus = FetchStatus.Loading;
    })
    .addCase(loadNearbyOffersSuccess, (state, action) => {
      state.nearbyOffersStatus = FetchStatus.Success;
      state.nearbyOffers = action.payload;
    })
    .addCase(loadNearbyOffersFailed, (state) => {
      state.nearbyOffersStatus = FetchStatus.Failed;
    })
    .addCase(loadReviewsRequest, (state) => {
      state.reviewsStatus = FetchStatus.Loading;
    })
    .addCase(loadReviewsSuccess, (state, action) => {
      state.reviewsStatus = FetchStatus.Success;
      state.reviews = action.payload;
    })
    .addCase(loadReviewsFailed, (state) => {
      state.reviewsStatus = FetchStatus.Failed;
    })
    .addCase(dropRoomData, (state) => {
      state.offer = null;
      state.offerStatus = FetchStatus.Idle;
      state.nearbyOffers = [];
      state.nearbyOffersStatus = FetchStatus.Idle;
      state.reviews = [];
      state.reviewsStatus = FetchStatus.Idle;
    })
    .addCase(postReviewRequest, (state) => {
      state.reviewPostStatus = FetchStatus.Loading;
    })
    .addCase(postReviewSuccess, (state, action) => {
      state.reviewPostStatus = FetchStatus.Success;
      state.reviews = action.payload;
    })
    .addCase(postReviewFailed, (state) => {
      state.reviewPostStatus = FetchStatus.Failed;
    })
    .addCase(resetPostReview, (state) => {
      state.reviewPostStatus = FetchStatus.Idle;
    });
});

export {appData};
