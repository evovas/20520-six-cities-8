import * as Redux from 'react-redux';
import * as ApiActions from '../../store/api-actions';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {Route, Switch} from 'react-router-dom';
import AuthUserMenu from './auth-user-menu';
import {makeFakeCurrentUser} from '../../utils/mocks';
import {AppRoute} from '../../const';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';

const history = createMemoryHistory();

const fakeUser = makeFakeCurrentUser();

const store = {
  [NameSpace.User]: {currentUser: fakeUser},
};

describe('Component: AuthUserMenu', () => {
  it('should render correctly', () => {
    renderWithRedux(<AuthUserMenu />, {
      preloadedState: store,
    });

    expect(screen.getByText(new RegExp(fakeUser.email, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should redirect to root when user click Sign Out and dispatch logoutAction', () => {
    history.push(AppRoute.Room);
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const logoutAction = jest.spyOn(ApiActions, 'logoutAction');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(
      <Switch>
        <Route exact path={AppRoute.Room}>
          <AuthUserMenu />
        </Route>
        <Route exact path={AppRoute.Root}><h1>Mock Main Page</h1></Route>
      </Switch>,
      {
        preloadedState: store,
      },
      {
        history: history,
      });

    expect(screen.queryByText(/Mock Main Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign out/i));
    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
    expect(logoutAction).toBeCalledWith();
  });
});
