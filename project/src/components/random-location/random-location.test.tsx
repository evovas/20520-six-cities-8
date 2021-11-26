import * as Redux from 'react-redux';
import {renderWithRedux, screen} from '../../utils/test-utils';
import RandomLocation from './random-location';
import userEvent from '@testing-library/user-event';

describe('Component: RandomLocation', () => {
  it('should render correctly', () => {
    renderWithRedux(<RandomLocation />);

    expect(screen.getByText(/Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/i)).toBeInTheDocument();
  });

  it('should dispatch selectCity after click', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<RandomLocation />);

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(0);

    userEvent.click(screen.getByRole('link'));

    expect(dispatch).toBeCalledTimes(1);
  });
});
