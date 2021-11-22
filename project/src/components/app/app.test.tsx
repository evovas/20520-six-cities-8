import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import App from './app';
import {makeFakeCity, makeFakeOffer, makeFakeUser} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, FetchStatus, SortingOption} from '../../const';

const DEFAULT_CITY = 'Paris';
const NON_EXISTENT_ROUTE = '/non-existent-route';

const mockStore = configureMockStore();
const fakeOffers = [{...makeFakeOffer(), city: {...makeFakeCity(), name: DEFAULT_CITY}}, {...makeFakeOffer(), city: {...makeFakeCity(), name: DEFAULT_CITY}}];

const storeAuth = mockStore({
  USER: {
    currentUser: makeFakeUser(),
    checkAuthStatus: FetchStatus.Success,
    authorizationStatus: AuthorizationStatus.Auth,
    logoutStatus: FetchStatus.Idle,
  },
  OFFERS: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
  },
  UI: {
    currentCityName: DEFAULT_CITY,
    currentSorting: SortingOption.Popular,
  },
});

const storeNoAuth = mockStore({
  OFFERS: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
  },
  USER: {
    currentUser: null,
    checkAuthStatus: FetchStatus.Success,
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  UI: {
    currentCityName: DEFAULT_CITY,
    currentSorting: SortingOption.Popular,
  },
});

const history = createMemoryHistory();

const fakeAppAuth = (
  <Provider store={storeAuth}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const fakeAppNoAuth = (
  <Provider store={storeNoAuth}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeAppAuth);

    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${DEFAULT_CITY}`, 'i'))).toBeInTheDocument();
  });

  it('should render "Main" with AuthorizationStatus.Auth when navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeAppAuth);

    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${DEFAULT_CITY}`, 'i'))).toBeInTheDocument();
  });

  it('should render "Login" with AuthorizationStatus.NoAuth when navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeAppNoAuth);

    expect(screen.getByLabelText(new RegExp('E-mail', 'i'))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp('Password', 'i'))).toBeInTheDocument();
  });

  it('should render "Login" with AuthorizationStatus.NoAuth when navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(fakeAppNoAuth);

    expect(screen.getByLabelText(new RegExp('E-mail', 'i'))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp('Password', 'i'))).toBeInTheDocument();
  });

  it('should render "Not found" when navigate to non existent route', () => {
    history.push(NON_EXISTENT_ROUTE);
    render(fakeAppNoAuth);

    expect(screen.getByText(new RegExp('404', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('This page doesn\'t exist.', 'i'))).toBeInTheDocument();
  });
});
