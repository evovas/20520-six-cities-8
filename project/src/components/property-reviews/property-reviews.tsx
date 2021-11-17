import {useSelector} from 'react-redux';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import {AuthorizationStatus, MAXIMUM_COMMENTS_COUNT} from '../../const';
import {selectReviews} from '../../store/reviews/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

type PropertyReviewsProps = {
  pageId: string;
}

function PropertyReviews({pageId}: PropertyReviewsProps): JSX.Element {
  const reviews = useSelector(selectReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <section className='property__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.length < 10 ? reviews.length : MAXIMUM_COMMENTS_COUNT}</span></h2>
      <ReviewList reviews={reviews} />
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm pageId={pageId} />}
    </section>
  );
}

export default PropertyReviews;
