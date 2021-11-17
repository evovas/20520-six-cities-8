import {createReducer} from '@reduxjs/toolkit';
import {User} from '../../types/state';
import {AuthorizationStatus, FetchStatus} from '../../const';
import {
  checkAuthFailed,
  checkAuthRequest,
  checkAuthSuccess,
  dropCurrentUser,
  requireAuthorizationFailed,
  requireAuthorizationRequest,
  requireAuthorizationSuccess,
  requireLogoutFailed,
  requireLogoutRequest,
  requireLogoutSuccess,
  saveCurrentUser
} from '../action';

const initialState: User = {
  currentUser: null,
  checkAuthStatus: FetchStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationRequestStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(saveCurrentUser, (state, action) => {
      state.currentUser = action.payload;
    })
    .addCase(dropCurrentUser, (state) => {
      state.currentUser = null;
    })
    .addCase(checkAuthRequest, (state) => {
      state.checkAuthStatus = FetchStatus.Loading;
    })
    .addCase(checkAuthSuccess, (state, action) => {
      state.checkAuthStatus = FetchStatus.Success;
      state.authorizationStatus = action.payload;
    })
    .addCase(checkAuthFailed, (state) => {
      state.checkAuthStatus = FetchStatus.Failed;
    })
    .addCase(requireAuthorizationRequest, (state) => {
      state.authorizationRequestStatus = FetchStatus.Loading;
    })
    .addCase(requireAuthorizationSuccess, (state) => {
      state.authorizationRequestStatus = FetchStatus.Success;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(requireAuthorizationFailed, (state) => {
      state.authorizationRequestStatus = FetchStatus.Failed;
    })
    .addCase(requireLogoutRequest, (state) => {
      state.logoutStatus = FetchStatus.Loading;
    })
    .addCase(requireLogoutSuccess, (state) => {
      state.logoutStatus = FetchStatus.Success;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(requireLogoutFailed, (state) => {
      state.logoutStatus = FetchStatus.Failed;
    });
});

export {user};
