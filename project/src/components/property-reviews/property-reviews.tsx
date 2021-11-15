import {useSelector} from 'react-redux';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import {AuthorizationStatus} from '../../const';
import {Review} from '../../types/data';
import {getReviews} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type PropertyReviewsProps = {
  pageId: string;
}

const MAXIMUM_COMMENTS_COUNT = 10;

const compareReviewDate = (reviewA: Review, reviewB: Review) => reviewB.date.getTime() - reviewA.date.getTime();

function PropertyReviews({pageId}: PropertyReviewsProps): JSX.Element {
  const reviews = useSelector(getReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <section className='property__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.length}</span></h2>
      <ReviewList reviews={reviews.sort(compareReviewDate).slice(0, MAXIMUM_COMMENTS_COUNT)} />
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm pageId={pageId} />}
    </section>
  );
}

export default PropertyReviews;
