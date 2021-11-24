import FavoritesList from './favorites-list';
import {makeFakeOffer} from '../../utils/mocks';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';

const fakeOffers = [makeFakeOffer(), makeFakeOffer()];

const emptyStore = {
  [NameSpace.Favorites]: {favoriteOffers: []},
};
const storeWithFavorites = {
  [NameSpace.Favorites]: {favoriteOffers: fakeOffers},
};

describe('Component: FavoritesList', () => {
  it('should render correctly without favorite offers', () => {
    renderWithRedux(<FavoritesList />, {preloadedState: emptyStore});

    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
  });

  it('should render correctly with favorite offers', () => {
    renderWithRedux(<FavoritesList />, {preloadedState: storeWithFavorites});

    expect(screen.queryByTestId('FavoritesEmpty')).not.toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('favorites-locations-by-city').length).toEqual(fakeOffers.length);
  });
});
