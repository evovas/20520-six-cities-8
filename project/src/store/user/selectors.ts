import {State} from '../../types/state';
import {CurrentUser} from '../../types/data';
import {NameSpace} from '../root-reducer';
import {AuthorizationStatus, FetchStatus} from '../../const';

export const getCurrentUser = (state: State): CurrentUser | null => state[NameSpace.User].currentUser;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthorizationRequestStatus = (state: State): FetchStatus => state[NameSpace.User].authorizationRequestStatus;
