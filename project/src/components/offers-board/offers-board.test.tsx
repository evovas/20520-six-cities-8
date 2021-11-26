import OffersBoard from './offers-board';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {makeFakeOffer} from '../../utils/mocks';

const fakeOffers = [makeFakeOffer(), makeFakeOffer()];

describe('Component: OffersBoard', () => {
  it('should render correctly', () => {
    renderWithRedux(<OffersBoard currentCityOffers={fakeOffers} />);

    expect(screen.getByText(`${fakeOffers.length} places to stay in ${fakeOffers[0].city.name}`)).toBeInTheDocument();
    expect(screen.getByTestId('sorting')).toBeInTheDocument();
    expect(screen.queryAllByTestId('place-card').length).toBe(fakeOffers.length);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
