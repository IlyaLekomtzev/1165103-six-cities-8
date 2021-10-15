import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';

type offersListPropsTypes = {
  offers: Offer[];
};

function OffersList({ offers }: offersListPropsTypes): JSX.Element {
  const defaultActiveOffer = 0;
  //eslint-disable-next-line
  const [activeOffer, setActiveOffer] = useState(defaultActiveOffer);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers && offers.map((offer) => <OfferCard key={offer.id} offer={offer} onMouseEnter={(id) => setActiveOffer(id)} onMouseLeave={() => setActiveOffer(defaultActiveOffer)} />)}
    </div>
  );
}

export default OffersList;
