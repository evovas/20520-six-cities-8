import {ChangeEvent, useState} from 'react';
import ReviewStar from '../review-star/review-star';

const STARS_IDENTIFIERS = ['5-stars', '4-stars', '3-stars', '2-stars', '1-star'];

function ReviewForm(): JSX.Element {
  const [review, setReview] = useState({
    rating: '0',
    review: '',
  });

  const onReviewChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setReview({...review, [name]: value});
  };

  return (
    <form className='reviews__form form' action='#' method='post'>
      {/*На время разработки*/}
      <div>{review.rating}</div>
      <div>{review.review}</div>
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        {STARS_IDENTIFIERS.map((id) => <ReviewStar key={id} value={id.split('-')[0]} id={id} onReviewChange={onReviewChange} />)}
      </div>
      <textarea className='reviews__textarea form__textarea' id='review' name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={review.review} onChange={onReviewChange}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and
          describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
