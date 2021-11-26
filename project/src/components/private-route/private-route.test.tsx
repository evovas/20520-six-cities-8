import {renderWithRedux} from '../../utils/test-utils';
import {createMemoryHistory} from 'history';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {screen} from '@testing-library/react';

const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  beforeEach(() => history.push(AppRoute.Favorites));

  it('should render Loader when authorization status unknown', () => {
    renderWithRedux(
      <Switch>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <div>Mock Private Page</div>}
          authorizationStatus={AuthorizationStatus.Unknown}
          verifiableStatus={AuthorizationStatus.Auth}
          redirectTo={AppRoute.Root}
        />
        <Route exact path={AppRoute.Root}>Mock Main Page</Route>
      </Switch>,
      {},
      {history},
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText('Mock Private Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Main Page')).not.toBeInTheDocument();
  });

  it('should redirect to Main Page when authorization statuses do not match', () => {
    renderWithRedux(
      <Switch>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <div>Mock Private Page</div>}
          authorizationStatus={AuthorizationStatus.NoAuth}
          verifiableStatus={AuthorizationStatus.Auth}
          redirectTo={AppRoute.Root}
        />
        <Route exact path={AppRoute.Root}>Mock Main Page</Route>
      </Switch>,
      {},
      {history},
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Private Page')).not.toBeInTheDocument();
    expect(screen.getByText('Mock Main Page')).toBeInTheDocument();
  });

  it('should render Private Page when authorization statuses are the same', () => {
    renderWithRedux(
      <Switch>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <div>Mock Private Page</div>}
          authorizationStatus={AuthorizationStatus.Auth}
          verifiableStatus={AuthorizationStatus.Auth}
          redirectTo={AppRoute.Root}
        />
        <Route exact path={AppRoute.Root}>Mock Main Page</Route>
      </Switch>,
      {},
      {history},
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText('Mock Private Page')).toBeInTheDocument();
    expect(screen.queryByText('Mock Main Page')).not.toBeInTheDocument();
  });
});
