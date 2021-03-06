import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendFavorite } from '../../store/api-actions';
import FavoriteButton from '../favorite-button/favorite-button';
import { Offer } from '../../types/offers';

type nearbyOfferCardPropsTypes = {
  offer: Offer;
}

function NearbyOfferCard({ offer }: nearbyOfferCardPropsTypes): JSX.Element {
  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    dispatch(sendFavorite(offer.id, offer.isFavorite));
  };

  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={260} height={200} alt="Place offer" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton
            parentClassName="place-card"
            width={18}
            height={19}
            isFavorite={offer.isFavorite}
            onClick={handleFavoriteClick}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default NearbyOfferCard;
