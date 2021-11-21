import { Review } from '../../types/reviews';
import ReviewsItem from '../reviews-item/reviews-item';

const REVIEWS_COUNT = 10;

type reviewsListPropsTypes = {
  reviews: Review[];
}

function ReviewsList({ reviews }: reviewsListPropsTypes): JSX.Element {
  const showReviews = [...reviews];
  if (showReviews.length > 1) {
    showReviews.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)).slice(0, REVIEWS_COUNT);
  }

  const renderReviews = () => {
    if (showReviews.length === 0) {
      return <h3 style={{ textAlign: 'center' }}>No reviews</h3>;
    }

    return showReviews.map((review) => <ReviewsItem key={review.id} review={review} />);
  };

  return (
    <>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{showReviews.length}</span></h2>
      <ul className="reviews__list">
        {renderReviews()}
      </ul>
    </>
  );
}

export default ReviewsList;
