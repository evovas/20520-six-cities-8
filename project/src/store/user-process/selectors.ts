import {State} from '../../types/state';
import {CurrentUser} from '../../types/data';
import {NameSpace} from '../root-reducer';
import {AuthorizationStatus, FetchStatus} from '../../const';

export const getCurrentUser = (state: State): CurrentUser | null => state[NameSpace.user].currentUser;
export const getCheckAuthStatus = (state: State): FetchStatus => state[NameSpace.user].checkAuthStatus;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getAuthorizationRequestStatus = (state: State): FetchStatus => state[NameSpace.user].authorizationRequestStatus;
export const getLogoutStatus = (state: State): FetchStatus => state[NameSpace.user].logoutStatus;
