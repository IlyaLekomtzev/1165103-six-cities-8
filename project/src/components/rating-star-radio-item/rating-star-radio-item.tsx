import { memo } from 'react';

type ratingStarRadioItemPropsTypes = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RatingStarRadioItem({ value, onChange }: ratingStarRadioItemPropsTypes): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" onChange={onChange} />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default memo(RatingStarRadioItem);
