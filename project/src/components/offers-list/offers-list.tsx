import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';

type offersListPropsTypes = {
  offers: Offer[];
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
};

function OffersList({ offers, onMouseEnter, onMouseLeave }: offersListPropsTypes): JSX.Element {
  const renderCards = () => offers.length > 0 ?
    (
      offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(id) => onMouseEnter(id)}
          onMouseLeave={() => onMouseLeave()}
        />
      ))
    ) : (
      <div>Not found</div>
    );

  return (
    <div className="cities__places-list places__list tabs__content">
      {renderCards()}
    </div>
  );
}

export default OffersList;
