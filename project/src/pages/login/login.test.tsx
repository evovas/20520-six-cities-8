import Login from './login';
import {renderWithRedux, screen} from '../../utils/test-utils';

describe('Component: Login Page', () => {
  it('should render correctly', () => {
    renderWithRedux(<Login />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('random-location')).toBeInTheDocument();
  });
});
