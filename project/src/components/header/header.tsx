import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/api-actions';
import { State } from '../../types/state';
import { AuthorizationStatus, AppRoute } from '../../const';

function Header(): JSX.Element {
  const { authorizationStatus, user } = useSelector(({ AUTH }: State) => AUTH);
  const dispatch = useDispatch();

  const handleLogoutClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  const renderAuthInfo = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return (
        <>
          <li className="header__nav-item user">
            <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
              <div
                className="header__avatar-wrapper user__avatar-wrapper"
                style={{ backgroundImage: `url(${user.avatarUrl})` }}
              />
              <span className="header__user-name user__name">{user.email ? user.email : ''}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <a
              href={AppRoute.Main}
              className="header__nav-link"
              onClick={handleLogoutClick}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </>
      );
    }

    return (
      <li className="header__nav-item">
        <Link to={AppRoute.Login} className="header__nav-link">
          <span className="header__signin">Sign in</span>
        </Link>
      </li>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {renderAuthInfo()}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
