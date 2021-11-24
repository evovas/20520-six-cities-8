import {renderWithRedux, screen} from '../../utils/test-utils';
import {makeFakeOffer} from '../../utils/mocks';
import FavoritesLocationsByCity from './favorites-locations-by-city';

const CITY = 'Paris';
const fakeOffers = [makeFakeOffer(), makeFakeOffer()];

describe('Component: FavoritesLocationsByCity', () => {
  it('should render correctly', () => {
    renderWithRedux(<FavoritesLocationsByCity city={CITY} cityOffers={fakeOffers} />);

    expect(screen.getByText(CITY)).toBeInTheDocument();
    expect(screen.queryAllByTestId('place-card').length).toEqual(fakeOffers.length);
  });
});
