import CardList from './card-list';
import {makeFakeOffer} from '../../utils/mocks';
import {renderWithRedux, screen} from '../../utils/test-utils';

const CARD_TYPE = 'cities';

const fakeOffers = [makeFakeOffer(), makeFakeOffer()];

describe('Component: CardList', () => {
  it('should render correctly', () => {
    renderWithRedux(
      <CardList
        offers={fakeOffers}
        cardType={CARD_TYPE}
        onMouseEnterCard={jest.fn()}
        onMouseLeaveCard={jest.fn()}
      />);

    expect(screen.getAllByTestId('place-card').length).toEqual(fakeOffers.length);
  });
});
