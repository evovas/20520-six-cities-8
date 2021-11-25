import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import ReviewStar from '../review-star/review-star';
import {useDispatch, useSelector} from 'react-redux';
import {postReviewAction} from '../../store/api-actions';
import {FetchStatus} from '../../const';
import Loader from '../loader/loader';
import {resetPostReview} from '../../store/action';
import {getReviewPostStatus} from '../../store/reviews/selectors';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const STARS_IDENTIFIERS = ['5-stars', '4-stars', '3-stars', '2-stars', '1-star'];

type ReviewFormProps = {
  pageId: string;
};

const initialState = {
  rating: '0',
  review: '',
};

function ReviewForm({pageId}: ReviewFormProps): JSX.Element {
  const dispatch = useDispatch();
  const reviewPostStatus = useSelector(getReviewPostStatus);

  const [review, setReview] = useState(initialState);

  useEffect(() => {
    if (reviewPostStatus === FetchStatus.Success) {
      setReview(initialState);
      dispatch(resetPostReview());
    }
  }, [reviewPostStatus]);

  const handleReviewChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setReview({...review, [name]: value});
  };

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postReviewAction(pageId, {
      comment: review.review,
      rating: review.rating,
    }));
  };

  const isValidReview = (review.rating !== '0') && (review.review.length >= MIN_REVIEW_LENGTH) && (review.review.length <= MAX_REVIEW_LENGTH);
  const isLoading = reviewPostStatus === FetchStatus.Loading;

  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={handleSubmitForm} data-testid='review-form'>

      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        {STARS_IDENTIFIERS.map((id) => (
          <ReviewStar
            key={id}
            value={id.split('-')[0]}
            currentValue={review.rating}
            id={id}
            onReviewChange={handleReviewChange}
            disabled={isLoading}
          />))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review' name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={review.review}
        onChange={handleReviewChange}
        disabled={isLoading}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and
          describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled={!isValidReview || isLoading}>
          {isLoading ? <Loader size={8} isReviewForm /> : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
