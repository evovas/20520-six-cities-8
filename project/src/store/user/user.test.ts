import {makeFakeCurrentUser} from '../../utils/mocks';
import {AuthorizationStatus, FetchStatus} from '../../const';
import {ActionType} from '../../types/action';
import {user} from './user';
import {User} from '../../types/state';

const initialState: User = {
  currentUser: null,
  checkAuthStatus: FetchStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationRequestStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

const fakeCurrentUser = makeFakeCurrentUser();

describe('Reducer: user', () => {
  it('returns initial state without additional parameters', () => {
    expect(user(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('currentUser should change to the specified user', () => {
    const state = {
      ...initialState,
    };
    const saveCurrentUserAction = {
      type: ActionType.SaveCurrentUser,
      payload: fakeCurrentUser,
    };

    expect(user(state, saveCurrentUserAction))
      .toEqual({
        ...initialState,
        currentUser: fakeCurrentUser,
      });
  });

  it('currentUser should change to the null', () => {
    const state = {
      ...initialState,
      currentUser: fakeCurrentUser,
    };
    const dropCurrentUserAction = {
      type: ActionType.DropCurrentUser,
    };

    expect(user(state, dropCurrentUserAction))
      .toEqual({
        ...initialState,
      });
  });

  it('checkAuthStatus should become Loading', () => {
    const state = {
      ...initialState,
    };
    const checkAuthRequestAction = {
      type: ActionType.CheckAuthRequest,
    };

    expect(user(state, checkAuthRequestAction))
      .toEqual({
        ...initialState,
        checkAuthStatus: FetchStatus.Loading,
      });
  });

  it('checkAuthStatus should become Success, and the authorization status to the specified', () => {
    const state = {
      ...initialState,
      checkAuthStatus: FetchStatus.Loading,
    };
    const checkAuthSuccessAction = {
      type: ActionType.CheckAuthSuccess,
      payload: AuthorizationStatus.Auth,
    };

    expect(user(state, checkAuthSuccessAction))
      .toEqual({
        ...initialState,
        checkAuthStatus: FetchStatus.Success,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });

  it('checkAuthStatus should become Failed, and the authorization status to the NoAuth', () => {
    const state = {
      ...initialState,
      checkAuthStatus: FetchStatus.Loading,
    };
    const checkAuthFailedAction = {
      type: ActionType.CheckAuthFailed,
    };

    expect(user(state, checkAuthFailedAction))
      .toEqual({
        ...initialState,
        checkAuthStatus: FetchStatus.Failed,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
  });

  it('authorizationStatus should become Loading', () => {
    const state = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };
    const requireAuthorizationRequestAction = {
      type: ActionType.RequireAuthorizationRequest,
    };

    expect(user(state, requireAuthorizationRequestAction))
      .toEqual({
        ...initialState,
        authorizationRequestStatus: FetchStatus.Loading,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
  });

  it('authorizationStatus should become Success, and the authorization status to the Auth', () => {
    const state = {
      ...initialState,
      authorizationRequestStatus: FetchStatus.Loading,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };
    const requireAuthorizationSuccessAction = {
      type: ActionType.RequireAuthorizationSuccess,
    };

    expect(user(state, requireAuthorizationSuccessAction))
      .toEqual({
        ...initialState,
        authorizationRequestStatus: FetchStatus.Success,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });

  it('authorizationStatus should become Failed', () => {
    const state = {
      ...initialState,
      authorizationRequestStatus: FetchStatus.Loading,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };
    const requireAuthorizationFailedAction = {
      type: ActionType.RequireAuthorizationFailed,
    };

    expect(user(state, requireAuthorizationFailedAction))
      .toEqual({
        ...initialState,
        authorizationRequestStatus: FetchStatus.Failed,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
  });


  it('logoutStatus should become Loading', () => {
    const state = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
    };
    const requireLogoutRequestAction = {
      type: ActionType.RequireLogoutRequest,
    };

    expect(user(state, requireLogoutRequestAction))
      .toEqual({
        ...initialState,
        logoutStatus: FetchStatus.Loading,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });

  it('logoutStatus should become Success, and the authorization status to the NoAuth', () => {
    const state = {
      ...initialState,
      logoutStatus: FetchStatus.Loading,
      authorizationStatus: AuthorizationStatus.Auth,
    };
    const requireLogoutSuccessAction = {
      type: ActionType.RequireLogoutSuccess,
    };

    expect(user(state, requireLogoutSuccessAction))
      .toEqual({
        ...initialState,
        logoutStatus: FetchStatus.Success,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
  });

  it('logoutStatus should become Failed', () => {
    const state = {
      ...initialState,
      logoutStatus: FetchStatus.Loading,
      authorizationStatus: AuthorizationStatus.Auth,
    };
    const requireLogoutFailedAction = {
      type: ActionType.RequireLogoutFailed,
    };

    expect(user(state, requireLogoutFailedAction))
      .toEqual({
        ...initialState,
        logoutStatus: FetchStatus.Failed,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });
});
