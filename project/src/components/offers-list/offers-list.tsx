import { useSelector } from 'react-redux';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';
import { OffersSortValue } from '../../const';
import { State } from '../../types/state';

type offersListPropsTypes = {
  offers: Offer[];
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
};

function OffersList({ offers, onMouseEnter, onMouseLeave }: offersListPropsTypes): JSX.Element {
  const { sort } = useSelector((state: State) => state);

  const renderCards = () => {
    switch (sort) {
      case OffersSortValue.PriceLowToHigh:
        offers = offers.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });
        break;
      case OffersSortValue.PriceHighToLow:
        offers = offers.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });
        break;
      case OffersSortValue.TopRatedFirst:
        offers = offers.sort((a, b) => {
          if (a.rating < b.rating) {
            return 1;
          }
          if (a.rating > b.rating) {
            return -1;
          }
          return 0;
        });
        break;
    }

    return (
      offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(id) => onMouseEnter(id)}
          onMouseLeave={() => onMouseLeave()}
        />
      ))
    );
  };

  if (offers.length === 0) {
    return <h3>Offers not found</h3>;
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {renderCards()}
    </div>
  );
}

export default OffersList;
