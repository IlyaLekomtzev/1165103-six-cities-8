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
  const sort = useSelector(({ OFFERS }: State) => OFFERS.sort);

  const getSortedOffers = () => {
    switch (sort) {
      case OffersSortValue.PriceLowToHigh:
        offers = offers.sort((a, b) => a.price - b.price);
        break;
      case OffersSortValue.PriceHighToLow:
        offers = offers.sort((a, b) => b.price - a.price);
        break;
      case OffersSortValue.TopRatedFirst:
        offers = offers.sort((a, b) => b.rating - a.rating);
        break;
    }

    return offers;
  };

  const renderCards = () => {
    const sortedOffers = getSortedOffers();

    return (
      sortedOffers.map((offer) => (
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
