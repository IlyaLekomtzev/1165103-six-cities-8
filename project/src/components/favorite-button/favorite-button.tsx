import { useSelector } from 'react-redux';
import { State } from '../../types/state';
import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus } from '../../const';

type favoriteButtonPropsTypes = {
  parentClassName: string;
  isFavorite: boolean;
  width: number;
  height: number;
  onClick: () => void;
};

function FavoriteButton({ parentClassName, isFavorite, width, height, onClick }: favoriteButtonPropsTypes): JSX.Element {
  const authorizationStatus = useSelector(({ AUTH }: State) => AUTH.authorizationStatus);

  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      onClick();
    } else {
      browserHistory.push(AppRoute.Login);
    }
  };

  return (
    <button
      className={`${parentClassName}__bookmark-button button ${isFavorite ? `${parentClassName}__bookmark-button--active` : ''}`}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${parentClassName}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
