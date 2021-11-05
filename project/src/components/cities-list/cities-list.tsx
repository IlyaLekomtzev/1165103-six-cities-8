import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCity } from '../../store/action';

type citiesListPropsTypes = {
  cities: string[];
  selectedCity: string;
}

function CitiesList({ cities, selectedCity }: citiesListPropsTypes): JSX.Element {
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>, city: string) => {
    event.preventDefault();
    dispatch(setCity(city));
  };

  const renderCities = () => (
    cities && cities.map((city) => (
      <li key={city} className="locations__item">
        <a
          className={`locations__item-link tabs__item ${city === selectedCity && 'tabs__item--active'}`}
          href="/"
          onClick={(event) => handleClick(event, city)}
        >
          <span>{city}</span>
        </a>
      </li>
    ))
  );

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {renderCities()}
      </ul>
    </section>
  );
}

export default memo(CitiesList);
