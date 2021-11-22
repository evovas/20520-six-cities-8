import {makeFakeReview} from '../../utils/mocks';
import {FetchStatus} from '../../const';
import {ActionType} from '../../types/action';
import {reviews} from './reviews';
import {Reviews} from '../../types/state';

const initialState: Reviews = {
  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewPostStatus: FetchStatus.Idle,
};

const fakeReviews = [makeFakeReview(), makeFakeReview()];

describe('Reducer: reviews', () => {
  it('returns initial state without additional parameters', () => {
    expect(reviews(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('reviewsStatus should become Loading', () => {
    const state = {
      ...initialState,
    };
    const loadReviewsRequestAction = {
      type: ActionType.LoadReviewsRequest,
    };

    expect(reviews(state, loadReviewsRequestAction))
      .toEqual({
        ...initialState,
        reviewsStatus: FetchStatus.Loading,
      });
  });

  it('reviewsStatus should become Success, and the list of reviews will be updated', () => {
    const state = {
      ...initialState,
      reviewsStatus: FetchStatus.Loading,
    };
    const loadReviewsSuccessAction = {
      type: ActionType.LoadReviewsSuccess,
      payload: fakeReviews,
    };

    expect(reviews(state, loadReviewsSuccessAction))
      .toEqual({
        ...initialState,
        reviewsStatus: FetchStatus.Success,
        reviews: fakeReviews,
      });
  });

  it('reviewsStatus should become Failed', () => {
    const state = {
      ...initialState,
      reviewsStatus: FetchStatus.Loading,
    };
    const loadReviewsFailedAction = {
      type: ActionType.LoadReviewsFailed,
    };

    expect(reviews(state, loadReviewsFailedAction))
      .toEqual({
        ...initialState,
        reviewsStatus: FetchStatus.Failed,
      });
  });

  it('reviewsStatus and the reviews should reset to the initial state', () => {
    const state = {
      ...initialState,
      reviewsStatus: FetchStatus.Success,
      reviews: fakeReviews,
    };
    const dropRoomReviewsDataAction = {
      type: ActionType.DropRoomReviewsData,
    };

    expect(reviews(state, dropRoomReviewsDataAction))
      .toEqual({
        ...initialState,
        reviewsStatus: FetchStatus.Idle,
        reviews: [],
      });
  });

  it('reviewPostStatus should become Loading', () => {
    const state = {
      ...initialState,
    };
    const postReviewRequestAction = {
      type: ActionType.PostReviewRequest,
    };

    expect(reviews(state, postReviewRequestAction))
      .toEqual({
        ...initialState,
        reviewPostStatus: FetchStatus.Loading,
      });
  });

  it('reviewPostStatus should become Success, and the list of reviews will be updated', () => {
    const state = {
      ...initialState,
      reviewPostStatus: FetchStatus.Loading,
    };
    const postReviewSuccessAction = {
      type: ActionType.PostReviewSuccess,
      payload: fakeReviews,
    };

    expect(reviews(state, postReviewSuccessAction))
      .toEqual({
        ...initialState,
        reviewPostStatus: FetchStatus.Success,
        reviews: fakeReviews,
      });
  });

  it('reviewPostStatus should become Failed', () => {
    const state = {
      ...initialState,
      reviewPostStatus: FetchStatus.Loading,
    };
    const postReviewFailedAction = {
      type: ActionType.PostReviewFailed,
    };

    expect(reviews(state, postReviewFailedAction))
      .toEqual({
        ...initialState,
        reviewPostStatus: FetchStatus.Failed,
      });
  });

  it('the reviewPostStatus should be reset to the initial state', () => {
    const state = {
      ...initialState,
      reviewPostStatus: FetchStatus.Success,
    };
    const resetPostReviewAction = {
      type: ActionType.ResetPostReview,
    };

    expect(reviews(state, resetPostReviewAction))
      .toEqual({
        ...initialState,
        reviewPostStatus: FetchStatus.Idle,
      });
  });
});
