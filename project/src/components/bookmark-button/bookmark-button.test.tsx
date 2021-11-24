import * as Redux from 'react-redux';
import * as ApiActions from '../../store/api-actions';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {Route,  Switch} from 'react-router-dom';
import BookmarkButton from './bookmark-button';
import {AppRoute, AuthorizationStatus} from '../../const';
import {renderWithRedux, screen, cleanup} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';


const BUTTON_TYPE = 'place-card';
const ID = 1;


const history = createMemoryHistory();

const storeAuth = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
};

const storeNoAuth = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth},
};

describe('Component: BookmarkButton', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly with both states isFavorite', () => {
    renderWithRedux(
      <BookmarkButton
        isFavorite
        buttonType={BUTTON_TYPE}
        id={ID}
      />,
      {preloadedState: storeAuth});

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.queryByText(/To bookmarks/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active')).toBeTruthy();
    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();

    cleanup();

    renderWithRedux(
      <BookmarkButton
        isFavorite={false}
        buttonType={BUTTON_TYPE}
        id={ID}
      />,
      {preloadedState: storeAuth});

    expect(screen.queryByText(/In bookmarks/i)).not.toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active')).toBeFalsy();
    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();
  });

  it('should dispatch postFavoriteOptionAction without redirect after click when AuthorizationStatus.Auth', () => {
    const IS_FAVORITE = true;

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const postFavoriteOptionAction = jest.spyOn(ApiActions, 'postFavoriteOptionAction');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(
      <Switch>
        <Route exact path={AppRoute.Root}>
          <BookmarkButton
            isFavorite={IS_FAVORITE}
            buttonType={BUTTON_TYPE}
            id={ID}
          />
        </Route>
        <Route exact path={AppRoute.Login}><h1>Mock Login Page</h1></Route>
      </Switch>,
      {preloadedState: storeAuth},
      {history});

    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
    expect(postFavoriteOptionAction).toBeCalledWith(ID, Number(!IS_FAVORITE));
  });

  it('should redirect without dispatch after click when AuthorizationStatus.NoAuth', () => {
    const IS_FAVORITE = false;

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(
      <Switch>
        <Route exact path={AppRoute.Root}>
          <BookmarkButton
            isFavorite={IS_FAVORITE}
            buttonType={BUTTON_TYPE}
            id={ID}
          />
        </Route>
        <Route exact path={AppRoute.Login}><h1>Mock Login Page</h1></Route>
      </Switch>,
      {preloadedState: storeNoAuth},
      {history});

    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Mock Login Page/i)).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(0);
  });
});
