import { useDispatch } from 'react-redux';
import { sendFavorite } from '../../store/api-actions';
import DetailHost from '../detail-host/detail-host';
import FavoriteButton from '../favorite-button/favorite-button';
import { Offer } from '../../types/offers';

type detailInfoPropsTypes = {
  offer: Offer;
}

function DetailInfo({ offer }: detailInfoPropsTypes): JSX.Element {
  const dispatch = useDispatch();

  const renderInsideList = () => (
    offer.goods && offer.goods.map((item) => (
      <li key={item} className="property__inside-item">
        {item}
      </li>
    ))
  );

  const handleFavoriteClick = () => {
    dispatch(sendFavorite(offer.id, offer.isFavorite));
  };

  return (
    <>
      {offer.isPremium && (
        <div className="property__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {offer.title}
        </h1>
        <FavoriteButton
          parentClassName="property"
          isFavorite={offer.isFavorite}
          width={31}
          height={33}
          onClick={handleFavoriteClick}
        />
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{ width: `${Math.round(offer.rating) * 20}%` }} />
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{offer.rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {offer.type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {offer.bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
          Max {offer.maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">€{offer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What`s inside</h2>
        <ul className="property__inside-list">
          {renderInsideList()}
        </ul>
      </div>
      <div className="property__host">
        <DetailHost host={offer.host} />
        <div className="property__description">
          <p className="property__text">
            {offer.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default DetailInfo;
