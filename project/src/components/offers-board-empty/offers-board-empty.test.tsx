import OffersBoardEmpty from './offers-board-empty';
import {renderWithRedux, screen} from '../../utils/test-utils';

const CITY_NAME = 'Paris';

describe('Component: OffersBoardEmpty', () => {
  it('should render correctly', () => {
    renderWithRedux(<OffersBoardEmpty currentCityName={CITY_NAME} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${CITY_NAME}`)).toBeInTheDocument();
  });
});
