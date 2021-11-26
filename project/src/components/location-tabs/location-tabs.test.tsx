import {renderWithRedux, screen} from '../../utils/test-utils';
import LocationTabs from './location-tabs';
import {CITIES_LIST} from '../../const';

describe('Component: LocationTabs', () => {
  it('should render correctly', () => {
    renderWithRedux(<LocationTabs />);

    expect(screen.queryAllByTestId('location-tab').length).toBe(CITIES_LIST.length);
  });
});
