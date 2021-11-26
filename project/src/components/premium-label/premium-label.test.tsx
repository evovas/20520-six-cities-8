import PremiumLabel from './premium-label';
import {renderWithRedux, screen} from '../../utils/test-utils';

const LABEL_CLASS = 'place-card__mark';

describe('Component: PremiumLabel', () => {
  it('should render correctly', () => {
    renderWithRedux(<PremiumLabel className={LABEL_CLASS} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByTestId('premium-label')).toHaveClass(LABEL_CLASS);
  });
});
