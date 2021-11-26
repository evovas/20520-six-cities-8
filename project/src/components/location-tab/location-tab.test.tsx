import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import LocationTab from './location-tab';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';
import {ActionType} from '../../types/action';

const STORE_CITY = 'Paris';
const NOT_STORE_CITY = 'Amsterdam';

const store = {
  [NameSpace.Ui]: {currentCityName: STORE_CITY},
};

describe('Component: LocationTab', () => {
  it('should render correctly for active city', () => {
    renderWithRedux(
      <LocationTab cityName={STORE_CITY} />,
      {preloadedState: store},
    );

    expect(screen.getByRole('link')).toHaveClass('tabs__item--active');
    expect(screen.getByText(STORE_CITY)).toBeInTheDocument();
  });

  it('should render correctly for not active city', () => {
    renderWithRedux(
      <LocationTab cityName={NOT_STORE_CITY} />,
      {preloadedState: store},
    );

    expect(screen.getByRole('link')).not.toHaveClass('tabs__item--active');
    expect(screen.getByText(NOT_STORE_CITY)).toBeInTheDocument();
  });

  it('should dispatch selectCity when user click to tab', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(
      <LocationTab cityName={NOT_STORE_CITY} />,
      {preloadedState: store},
    );

    userEvent.click(screen.getByRole('link'));

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.SelectCity,
      payload: NOT_STORE_CITY,
    });
  });
});
