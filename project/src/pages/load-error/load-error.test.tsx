import LoadError from './load-error';
import {renderWithRedux, screen} from '../../utils/test-utils';

describe('Component: LoadError Page', () => {
  it('should render correctly', () => {
    renderWithRedux(<LoadError />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred while loading data. Please try again later.')).toBeInTheDocument();
  });
});
