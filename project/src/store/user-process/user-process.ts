import {UserProcess} from '../../types/state';
import {AuthorizationStatus, FetchStatus} from '../../const';
import {Actions, ActionType} from '../../types/action';

const initialState: UserProcess = {
  currentUser: null,
  checkAuthStatus: FetchStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationRequestStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

const userProcess = (state = initialState, action: Actions): UserProcess => {
  switch (action.type) {
    case ActionType.SaveCurrentUser: {
      return {...state, currentUser: action.payload};
    }
    case ActionType.DropCurrentUser: {
      return {...state, currentUser: null};
    }
    case ActionType.CheckAuthRequest: {
      return {...state, checkAuthStatus: FetchStatus.Loading};
    }
    case ActionType.CheckAuthSuccess: {
      return {
        ...state,
        checkAuthStatus: FetchStatus.Success,
        authorizationStatus: AuthorizationStatus.Auth,
      };
    }
    case ActionType.CheckAuthFailed: {
      return {...state, checkAuthStatus: FetchStatus.Failed};
    }
    case ActionType.RequireAuthorizationRequest: {
      return {...state, authorizationRequestStatus: FetchStatus.Loading};
    }
    case ActionType.RequireAuthorizationSuccess: {
      return {
        ...state,
        authorizationRequestStatus: FetchStatus.Success,
        authorizationStatus: AuthorizationStatus.Auth,
      };
    }
    case ActionType.RequireAuthorizationFailed: {
      return {...state, authorizationRequestStatus: FetchStatus.Failed};
    }
    case ActionType.RequireLogoutRequest: {
      return {...state, logoutStatus: FetchStatus.Loading};
    }
    case ActionType.RequireLogoutSuccess: {
      return {...state,
        logoutStatus: FetchStatus.Success,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };
    }
    case ActionType.RequireLogoutFailed: {
      return {...state, logoutStatus: FetchStatus.Failed};
    }
    default:
      return state;
  }
};

export {userProcess};
