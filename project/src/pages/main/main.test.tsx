import Main from './main';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {makeFakeCity, makeFakeOffer} from '../../utils/mocks';
import {NameSpace} from '../../store/root-reducer';

const storeWithOffers = {
  [NameSpace.Offers]: {offers: [{...makeFakeOffer(), city: {...makeFakeCity(), name: 'Paris'}}, {...makeFakeOffer(), city: {...makeFakeCity(), name: 'Paris'}}]},
};

const storeWithoutOffers = {
  [NameSpace.Offers]: {offers: []},
};

describe('Component: Main Page', () => {
  it('should render correctly with offers', () => {
    renderWithRedux(<Main />, {preloadedState: storeWithOffers});

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('location-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('offers-board')).toBeInTheDocument();
    expect(screen.queryByTestId('offers-board-empty')).not.toBeInTheDocument();
  });

  it('should render correctly without offers', () => {
    renderWithRedux(<Main />, {preloadedState: storeWithoutOffers});

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('location-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('offers-board-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('offers-board')).not.toBeInTheDocument();
  });
});
