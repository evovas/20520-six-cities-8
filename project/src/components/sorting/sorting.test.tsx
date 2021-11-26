import Sorting from './sorting';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';
import {SortingOption} from '../../const';

const currentSorting = SortingOption.Popular;

const store = {
  [NameSpace.Ui]: {currentSorting},
};

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    renderWithRedux(<Sorting />, {preloadedState: store});

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.queryAllByText(currentSorting).length).toBe(2);
    expect(screen.getByText(SortingOption.TopRatedFirst)).toBeInTheDocument();
    expect(screen.getByText(SortingOption.PriceHighFirst)).toBeInTheDocument();
    expect(screen.getByText(SortingOption.PriceLowFirst)).toBeInTheDocument();
  });
});
