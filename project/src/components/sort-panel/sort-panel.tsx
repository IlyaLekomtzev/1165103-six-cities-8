import { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../../store/action';
import { offersSortValues } from '../../const';
import { State } from '../../types/state';

function SortPanel(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const sort = useSelector(({ OFFERS }: State) => OFFERS.sort);
  const dispatch = useDispatch();

  const renderItems = () => {
    if (offersSortValues) {
      return (
        offersSortValues.map((sortValue) => (
          <li
            className={`places__option ${sort === sortValue.value && 'places__option--active'}`}
            tabIndex={0}
            key={sortValue.value}
            onClick={() => dispatch(setSort(sortValue.value))}
          >
            {sortValue.title}
          </li>
        ))
      );
    }
  };

  return (
    <form className="places__sorting" action="/" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened((state) => !state)}>
        {offersSortValues.find((sortValue) => sortValue.value === sort)?.title}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {renderItems()}
      </ul>
    </form>
  );
}

export default memo(SortPanel);
