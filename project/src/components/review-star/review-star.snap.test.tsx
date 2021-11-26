import ReviewStar from './review-star';
import {renderWithRedux} from '../../utils/test-utils';

describe('Component: ReviewStar (snapshot)', () => {
  test('should render correctly', () => {
    const {container} = renderWithRedux(
      <ReviewStar
        value={'3'}
        currentValue={'3'}
        id={'3-stars'}
        onReviewChange={jest.fn()}
        disabled={false}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
