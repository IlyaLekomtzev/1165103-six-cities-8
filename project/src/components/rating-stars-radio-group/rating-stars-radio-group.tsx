import { memo } from 'react';
import RatingStarRadioItem from '../rating-star-radio-item/rating-star-radio-item';

type ratingStarsRadioGroupPropsTypes = {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RatingStarsRadioGroup({ label, onChange }: ratingStarsRadioGroupPropsTypes): JSX.Element {
  return (
    <>
      <label className="reviews__label form__label" htmlFor="review">{label}</label>
      <div className="reviews__rating-form form__rating">
        <RatingStarRadioItem
          value={5}
          onChange={onChange}
        />
        <RatingStarRadioItem
          value={4}
          onChange={onChange}
        />
        <RatingStarRadioItem
          value={3}
          onChange={onChange}
        />
        <RatingStarRadioItem
          value={2}
          onChange={onChange}
        />
        <RatingStarRadioItem
          value={1}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default memo(RatingStarsRadioGroup);
