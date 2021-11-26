import Header from './header';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';
import {AuthorizationStatus} from '../../const';

const storeUserAuth = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
};

const storeUserNoAuth = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth},
};

describe('Component: Header', () => {
  it('should render correctly user is auth', () => {
    renderWithRedux(<Header />, {preloadedState: storeUserAuth});

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('auth-user-menu')).toBeInTheDocument();
    expect(screen.queryByTestId('no-auth-user-menu')).not.toBeInTheDocument();
  });

  it('should render correctly user is no auth', () => {
    renderWithRedux(<Header />, {preloadedState: storeUserNoAuth});

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.queryByTestId('auth-user-menu')).not.toBeInTheDocument();
    expect(screen.getByTestId('no-auth-user-menu')).toBeInTheDocument();
  });
});
