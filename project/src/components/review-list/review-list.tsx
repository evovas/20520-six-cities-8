import ReviewItem from '../review-item/review-item';
import {Review} from '../../types/data';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  return (
    <ul className='reviews__list' data-testid='review-list'>
      {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewList;
