import {combineReducers} from '@reduxjs/toolkit';
import {appData} from './app-data/app-data';
import {bookingProcess} from './booking-process/booking-process';
import {userProcess} from './user-process/user-process';

export enum NameSpace {
  data = 'DATA',
  booking = 'BOOKING',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.booking]: bookingProcess,
  [NameSpace.user]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
