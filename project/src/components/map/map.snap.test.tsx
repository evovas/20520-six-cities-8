import Map from './map';
import {renderWithRedux} from '../../utils/test-utils';
import {City, Offer} from '../../types/data';

const fakeOffers: Offer[] = [];
const fakeCity: City = {
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  name: 'Paris',
};

describe('Component: Map', () => {
  test('should render correctly', () => {
    const {container} = renderWithRedux(
      <Map
        className={'cities__map'}
        offers={fakeOffers}
        city={fakeCity}
        activeCardId={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
