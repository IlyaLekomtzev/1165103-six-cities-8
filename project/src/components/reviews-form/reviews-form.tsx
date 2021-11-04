import { useState } from 'react';
import { useDispatch } from 'react-redux';
import RatingStarsRadioGroup from '../rating-stars-radio-group/rating-stars-radio-group';
import { sendReview } from '../../store/api-actions';

type reviewsFormPropsTypes = {
  id: string;
}

function ReviewsForm({ id }: reviewsFormPropsTypes): JSX.Element {
  const [formState, setFormState] = useState({
    rating: 0,
    message: '',
  });
  const dispatch = useDispatch();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendReview({ id, rating: formState.rating, comment: formState.message }));
    setFormState((state) => ({ ...state, message: '' }));
  };

  return (
    <form className="reviews__form form" action="/" method="post" onSubmit={handleFormSubmit}>
      <RatingStarsRadioGroup
        label="Your review"
        onChange={(event) => setFormState({ ...formState, rating: Number(event.target.value) })}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.message}
        onChange={(event) => setFormState({ ...formState, message: event.target.value })}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!(formState.rating > 0 && formState.message.length >= 50)}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
