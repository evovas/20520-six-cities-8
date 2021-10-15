import {ChangeEvent} from 'react';

type ReviewStarProps = {
  value: string;
  id: string;
  onReviewChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function ReviewStar({value, id, onReviewChange}: ReviewStarProps): JSX.Element {
  return (
    <>
      <input className='form__rating-input visually-hidden' name='rating' value={value} id={id}
        type='radio' onChange={onReviewChange}
      />
      <label htmlFor={id} className='reviews__rating-label form__rating-label' title='perfect'>
        <svg className='form__star-image' width='37' height='33'>
          <use xlinkHref='#icon-star'/>
        </svg>
      </label>
    </>
  );
}

export default ReviewStar;
