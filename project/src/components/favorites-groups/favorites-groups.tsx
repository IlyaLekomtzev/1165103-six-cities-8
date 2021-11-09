import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorites } from '../../store/api-actions';
import { setCity } from '../../store/action';
import { State } from '../../types/state';
import { AppRoute, cities } from '../../const';
import Spinner from '../spinner/spinner';
import FavoritesList from '../favorites-list/favorites-list';
import browserHistory from '../../browser-history';

function FavoritesGroups(): JSX.Element {
  const dispatch = useDispatch();
  const { offers, isLoading } = useSelector(({ FAVORITE }: State) => FAVORITE);
  let groups = cities.map((city) => (
    {
      city,
      offers: offers.filter((offer) => offer.city.name === city),
    }
  ));
  groups = groups.filter((group) => group.offers.length > 0);

  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>, city: string) => {
    event.preventDefault();
    dispatch(setCity(city));
    browserHistory.push(AppRoute.Main);
  };

  const renderGroups = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (groups.length > 0) {
      return (
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          {groups.map((group) => (
            <li className="favorites__locations-items" key={group.city}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a href={AppRoute.Main} className="locations__item-link" onClick={(e) => handleClick(e, group.city)}>
                    <span>{group.city}</span>
                  </a>
                </div>
              </div>
              {group.offers.length > 0 && <FavoritesList offers={group.offers} />}
            </li>
          ))}
        </section>
      );
    } else {
      return (
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
          </div>
        </section>
      );
    }
  };

  return (
    <ul className="favorites__list">
      {renderGroups()}
    </ul>
  );
}

export default FavoritesGroups;
