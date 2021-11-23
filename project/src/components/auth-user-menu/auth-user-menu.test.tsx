import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import AuthUserMenu from './auth-user-menu';
import {makeFakeCurrentUser} from '../../utils/mocks';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeUser = makeFakeCurrentUser();
const store = mockStore({
  USER: {
    currentUser: fakeUser,
  },
});

describe('Component: AuthUserMenu', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <AuthUserMenu />
        </Router>
      </Provider>);

    expect(screen.getByText(new RegExp(fakeUser.email, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should redirect to root when user click Sign Out', () => {
    history.push(AppRoute.Room);
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Room}>
              <AuthUserMenu />
            </Route>
            <Route exact path={AppRoute.Root}><h1>Mock Main Page</h1></Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/Mock Main Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign out/i));
    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
  });
});
