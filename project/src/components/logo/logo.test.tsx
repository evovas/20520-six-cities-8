import {createMemoryHistory} from 'history';
import {Route, Switch} from 'react-router-dom';
import {renderWithRedux, screen} from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    renderWithRedux(<Logo />);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    renderWithRedux(
      <Switch>
        <Route path="/" exact>
          <h1>This is main page</h1>
        </Route>
        <Route>
          <Logo />
        </Route>
      </Switch>,
      {},
      {history},
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
