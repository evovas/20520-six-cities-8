import {Review} from '../types/reviews';
import {USERS} from './users';

export const REVIEWS: Review[] = [
  {
    id: 1,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: new Date(),
    rating: 2,
    user: USERS[0],
  },
  {
    id: 2,
    comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: new Date(),
    rating: 3,
    user: USERS[1],
  },
  {
    id: 3,
    comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: new Date(),
    rating: 4,
    user: USERS[2],
  },
  {
    id: 4,
    comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date(),
    rating: 5,
    user: USERS[3],
  },
];
