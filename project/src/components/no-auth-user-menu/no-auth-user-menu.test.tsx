import {renderWithRedux, screen} from '../../utils/test-utils';
import {createMemoryHistory} from 'history';
import {Route, Switch} from 'react-router-dom';
import {AppRoute} from '../../const';
import userEvent from '@testing-library/user-event';
import NoAuthUserMenu from './no-auth-user-menu';

const history = createMemoryHistory();

describe('Component: AuthUserMenu', () => {
  it('should render correctly', () => {
    renderWithRedux(<NoAuthUserMenu />);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should redirect to login page whe user click to Sign in' , () => {
    history.push(AppRoute.Root);

    renderWithRedux(
      <Switch>
        <Route exact path={AppRoute.Root}>
          <NoAuthUserMenu />
        </Route>
        <Route exact path={AppRoute.Login}><h1>Mock Login Page</h1></Route>
      </Switch>,
      {},
      {
        history: history,
      });

    expect(screen.queryByText(/Mock Login Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: 'Sign in'}));
    expect(screen.getByText(/Mock Login Page/i)).toBeInTheDocument();
  });
});
