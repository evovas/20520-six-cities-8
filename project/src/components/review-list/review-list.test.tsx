import ReviewList from './review-list';
import {makeFakeReview} from '../../utils/mocks';
import {renderWithRedux, screen} from '../../utils/test-utils';

const fakeReviews = [makeFakeReview(), makeFakeReview()];

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    renderWithRedux(<ReviewList reviews={fakeReviews} />);

    expect(screen.queryAllByTestId('review-item').length).toBe(fakeReviews.length);
  });
});
