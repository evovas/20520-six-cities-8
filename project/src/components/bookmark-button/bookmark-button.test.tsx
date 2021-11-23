import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import BookmarkButton from './bookmark-button';
import {AppRoute, AuthorizationStatus} from '../../const';

const BUTTON_TYPE = 'place-card';
const ID = 1;

const mockStore = configureMockStore();
const history = createMemoryHistory();

const storeAuth = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

const storeNoAuth = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: BookmarkButton', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly with both states isFavorite', () => {
    const {rerender} = render(
      <Provider store={storeAuth}>
        <BookmarkButton
          isFavorite
          buttonType={BUTTON_TYPE}
          id={ID}
        />
      </Provider>);

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.queryByText(/To bookmarks/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active')).toBeTruthy();
    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();

    rerender(
      <Provider store={storeAuth}>
        <BookmarkButton
          isFavorite={false}
          buttonType={BUTTON_TYPE}
          id={ID}
        />
      </Provider>);

    expect(screen.queryByText(/In bookmarks/i)).not.toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active')).toBeFalsy();
    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();
  });

  it('should dispatch without redirect when AuthorizationStatus.Auth', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={storeAuth}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Root}>
              <BookmarkButton
                isFavorite
                buttonType={BUTTON_TYPE}
                id={ID}
              />
            </Route>
            <Route exact path={AppRoute.Login}><h1>Mock Login Page</h1></Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should redirect without dispatch when AuthorizationStatus.NoAuth', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={storeNoAuth}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Root}>
              <BookmarkButton
                isFavorite
                buttonType={BUTTON_TYPE}
                id={ID}
              />
            </Route>
            <Route exact path={AppRoute.Login}><h1>Mock Login Page</h1></Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Mock Login Page/i)).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(0);
  });
});
