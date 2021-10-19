import NearbyOfferCard from '../nearby-offer-card/nearby-offer-card';
import { Offer } from '../../types/offers';

type nearbyOffersListPropsTypes = {
  offers: Offer[];
}

function NearbyOffersList({ offers }: nearbyOffersListPropsTypes): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.length > 0 ? (
        offers.map((offer) => <NearbyOfferCard key={offer.id} offer={offer} />)
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
}

export default NearbyOffersList;
