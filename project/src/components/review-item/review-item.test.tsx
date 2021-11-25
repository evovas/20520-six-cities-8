import dayjs from 'dayjs';
import ReviewItem from './review-item';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {makeFakeReview} from '../../utils/mocks';

const fakeReview = makeFakeReview();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const {container} = renderWithRedux(<ReviewItem review={fakeReview} />);

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(container.querySelector('.reviews__stars')).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText(dayjs(fakeReview.date).format('MMMM YYYY'))).toBeInTheDocument();
  });
});
