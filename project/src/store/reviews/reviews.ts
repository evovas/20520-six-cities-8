import {Reviews} from '../../types/state';
import {FetchStatus} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {
  dropRoomReviewsData,
  loadReviewsFailed,
  loadReviewsRequest,
  loadReviewsSuccess,
  postReviewFailed,
  postReviewRequest,
  postReviewSuccess,
  resetPostReview
} from '../action';

const initialState: Reviews = {
  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewPostStatus: FetchStatus.Idle,
};

const reviews = createReducer(initialState, (builder) => {
  builder
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
    .addCase(dropRoomReviewsData, (state) => {
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

export {reviews};
