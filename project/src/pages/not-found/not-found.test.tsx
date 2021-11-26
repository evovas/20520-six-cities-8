import NotFound from './not-found';
import {renderWithRedux, screen} from '../../utils/test-utils';

describe('Component: NotFound Page', () => {
  it('should render correctly', () => {
    renderWithRedux(<NotFound />);

    expect(screen.queryByTestId('header')).toBeInTheDocument();
    expect(screen.queryByText('404 This page doesn\'t exist.')).toBeInTheDocument();
    expect(screen.queryByTestId('random-location')).toBeInTheDocument();
  });
});
