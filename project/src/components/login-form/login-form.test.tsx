import * as Redux from 'react-redux';
import * as ApiActions from '../../store/api-actions';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';
import {FetchStatus} from '../../const';
import LoginForm from './login-form';
import userEvent from '@testing-library/user-event';

const INCORRECT_LOGIN = 'test';
const INCORRECT_PASSWORD = 'a';
const CORRECT_LOGIN = 'test@test.ru';
const CORRECT_PASSWORD = 'Aa1';

const storeAuthorizationRequestLoading = {
  [NameSpace.User]: {authorizationRequestStatus: FetchStatus.Loading},
};

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    renderWithRedux(<LoginForm />);

    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeDisabled();

    expect(screen.queryByText('Please, enter a valid E-mail address')).not.toBeInTheDocument();
    expect(screen.queryByText('Minimum 1 uppercase, 1 lowercase letter and 1 number')).not.toBeInTheDocument();

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should render correctly with incorrect login and password', () => {
    renderWithRedux(<LoginForm />);

    userEvent.type(screen.getByPlaceholderText('E-mail'), INCORRECT_LOGIN);
    userEvent.type(screen.getByPlaceholderText('Password'), INCORRECT_PASSWORD);

    expect(screen.getByText('Please, enter a valid E-mail address')).toBeInTheDocument();
    expect(screen.getByText('Minimum 1 uppercase, 1 lowercase letter and 1 number')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeDisabled();
  });

  it('should render correctly with correct login and password', () => {
    renderWithRedux(<LoginForm />);

    userEvent.type(screen.getByPlaceholderText('E-mail'), CORRECT_LOGIN);
    userEvent.type(screen.getByPlaceholderText('Password'), CORRECT_PASSWORD);

    expect(screen.queryByText('Please, enter a valid E-mail address')).not.toBeInTheDocument();
    expect(screen.queryByText('Minimum 1 uppercase, 1 lowercase letter and 1 number')).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeEnabled();
  });

  it('should dispatch loginAction with data entered in the form', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const loginAction = jest.spyOn(ApiActions, 'loginAction');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<LoginForm />);

    userEvent.type(screen.getByPlaceholderText('E-mail'), CORRECT_LOGIN);
    userEvent.type(screen.getByPlaceholderText('Password'), CORRECT_PASSWORD);

    expect(screen.getByRole('button', {name: 'Sign in'})).toBeEnabled();

    userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    expect(dispatch).toBeCalledTimes(1);
    expect(loginAction).toBeCalledWith({
      login: CORRECT_LOGIN,
      password: CORRECT_PASSWORD,
    });
  });

  it('should render loader on the button when request is loading', () => {
    renderWithRedux(<LoginForm />, {preloadedState: storeAuthorizationRequestLoading});

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Sign in'})).not.toBeInTheDocument();
  });
});
