import UserProLabel from './user-pro-label';
import {renderWithRedux, screen} from '../../utils/test-utils';

describe('Component: UserProLabel', () => {
  it('should render correctly', () => {
    renderWithRedux(<UserProLabel />);

    expect(screen.getByText('Pro')).toBeInTheDocument();
  });
});
