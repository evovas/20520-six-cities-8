import {State} from '../../types/state';
import {Review} from '../../types/data';
import {NameSpace} from '../root-reducer';
import {FetchStatus} from '../../const';
import {createSelector} from '@reduxjs/toolkit';

const MAXIMUM_COMMENTS_COUNT = 10;

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getReviewsStatus = (state: State): FetchStatus => state[NameSpace.Reviews].reviewsStatus;
export const getReviewPostStatus = (state: State): FetchStatus => state[NameSpace.Reviews].reviewPostStatus;

export const selectReviews = createSelector([getReviews], (reviews) => {
  const compareReviewDate = (reviewA: Review, reviewB: Review) => new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime();
  return reviews.slice(0, MAXIMUM_COMMENTS_COUNT).sort(compareReviewDate);
});
