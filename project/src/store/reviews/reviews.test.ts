import {Reviews} from '../../types/state';
import {FetchStatus} from '../../const';
import {makeFakeReview} from '../../utils/mocks';
import {ActionType} from '../../types/action';
import {reviews} from './reviews';
import {resetPostReview} from '../action';

const initialState: Reviews = {
  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewPostStatus: FetchStatus.Idle,
};

const fakeReviews = [makeFakeReview(), makeFakeReview()];

describe('Reducer: reviews', () => {
  it('без дополнительных параметров возвращает initial state', () => {
    expect(reviews(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('статус загрузки комментариев должен стать Loading', () => {
    const state = {
      ...initialState,
      reviewsStatus: FetchStatus.Idle,
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

  it('статус загрузки комментариев должен стать Success, а список комментариев обновиться', () => {
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

  it('статус загрузки комментариев должен стать Failed', () => {
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

  it('статус загрузки комментариев и сами комментарии должны сброситься до initial state', () => {
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

  it('статус отправки комментария должен стать Loading', () => {
    const state = {
      ...initialState,
      reviewPostStatus: FetchStatus.Idle,
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

  it('статус отправки комментария должен стать Success, а список комментариев обновиться', () => {
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

  it('статус отправки комментария должен стать Failed', () => {
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

  it('статус отправки комментария должен сброситься до initial state', () => {
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
