import {State} from '../../types/state';
import {Review} from '../../types/data';
import {NameSpace} from '../root-reducer';
import {FetchStatus, MAXIMUM_COMMENTS_COUNT} from '../../const';
import {createSelector} from '@reduxjs/toolkit';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getReviewPostStatus = (state: State): FetchStatus => state[NameSpace.Reviews].reviewPostStatus;

export const selectReviews = createSelector([getReviews], (reviews) => {
  const compareReviewDate = (reviewA: Review, reviewB: Review) => new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime();
  return reviews.slice().sort(compareReviewDate).slice(0, MAXIMUM_COMMENTS_COUNT);
});
