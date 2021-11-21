import React, { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import RatingStarsRadioGroup from '../rating-stars-radio-group/rating-stars-radio-group';
import { sendReview } from '../../store/api-actions';

type reviewsFormPropsTypes = {
  id: string;
}

const MESSAGE_MIN_LENGTH = 50;
const MESSAGE_MAX_LENGTH = 300;

function ReviewsForm({ id }: reviewsFormPropsTypes): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [radioGroupCounter, setRadioGroupCounter] = useState<number>(0);
  const dispatch = useDispatch();

  const handleRadioChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  }, []);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  }, []);

  const clearForm = () => {
    setRating(0);
    setMessage('');
    setRadioGroupCounter((state) => state + 1);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(sendReview({ id, rating, comment: message }));
    clearForm();
  };

  const handleButtonDisabled = () => {
    if (rating > 0 && message.length >= MESSAGE_MIN_LENGTH && message.length <= MESSAGE_MAX_LENGTH) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form className="reviews__form form" action="/" method="post" onSubmit={handleFormSubmit}>
      <RatingStarsRadioGroup
        label="Your review"
        onChange={handleRadioChange}
        key={radioGroupCounter}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={message}
        onChange={handleTextChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={handleButtonDisabled()}>Submit</button>
      </div>
    </form>
  );
}

export default memo(ReviewsForm);
