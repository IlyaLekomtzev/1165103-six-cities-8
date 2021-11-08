import FavoriteCard from '../favorite-card/favorite-card';
import { Offer } from '../../types/offers';

type favoritesListPropsTypes = {
  offers: Offer[];
};

function FavoritesList({ offers }: favoritesListPropsTypes): JSX.Element {
  return (
    <div className="favorites__places">
      {offers.map((offer) => <FavoriteCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default FavoritesList;
