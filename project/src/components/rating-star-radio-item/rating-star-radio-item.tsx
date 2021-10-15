type ratingStarRadioItemPropsTypes = {
  defaultValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RatingStarRadioItem({ defaultValue, onChange }: ratingStarRadioItemPropsTypes): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={defaultValue} id={`${defaultValue}-stars`} type="radio" onChange={onChange} />
      <label htmlFor={`${defaultValue}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default RatingStarRadioItem;
