import {combineReducers} from '@reduxjs/toolkit';
import {favorites} from './favorites/favorites';
import {offers} from './offers/offers';
import {reviews} from './reviews/reviews';
import {ui} from './ui/ui';
import {user} from './user/user';

export enum NameSpace {
  Favorites = 'FAVORITES',
  Offers = 'OFFERS',
  Reviews = 'REVIEWS',
  Ui = 'UI',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Favorites]: favorites,
  [NameSpace.Offers]: offers,
  [NameSpace.Reviews]: reviews,
  [NameSpace.Ui]: ui,
  [NameSpace.User]: user,
});

export type RootState = ReturnType<typeof rootReducer>;
