import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendFavorite } from '../../store/api-actions';
import FavoriteButton from '../favorite-button/favorite-button';
import { Offer } from '../../types/offers';

type offerCardPropsTypes = {
  offer: Offer;
  onMouseEnter: (id: number) => void;
};

function OfferCard({ offer, onMouseEnter }: offerCardPropsTypes): JSX.Element {
  const dispatch = useDispatch();
  const { id, title, previewImage, price, type, isPremium, isFavorite, rating } = offer;

  const handleFavoriteClick = () => {
    dispatch(sendFavorite(id, isFavorite));
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => onMouseEnter(id)}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton
            parentClassName="place-card"
            isFavorite={isFavorite}
            width={18}
            height={19}
            onClick={handleFavoriteClick}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard);
