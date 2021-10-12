import {User} from './users';

export type Review = {
  id: number;
  comment: string;
  date: Date;
  rating: number;
  user: User;
}

export type Reviews = Review[];
