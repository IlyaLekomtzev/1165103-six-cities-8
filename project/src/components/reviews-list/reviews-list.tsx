import { Review } from '../../types/reviews';
import ReviewsItem from '../reviews-item/reviews-item';

type reviewsListPropsTypes = {
  reviews: Review[];
}

function ReviewsList({ reviews }: reviewsListPropsTypes): JSX.Element {
  const renderReviews = () => (
    reviews.length > 0 ? (
      reviews.map((review) => <ReviewsItem key={review.id} review={review} />)
    ) : (
      <div>Not Found</div>
    )
  );

  return (
    <>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {renderReviews()}
      </ul>
    </>
  );
}

export default ReviewsList;
