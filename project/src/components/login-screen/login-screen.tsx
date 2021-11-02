import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import browserHistory from '../../browser-history';
import LoginForm from '../login-form/login-form';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../../store/action';
import { State } from '../../types/state';
import { AuthorizationStatus, AppRoute, cities } from '../../const';

function LoginScreen(): JSX.Element {
  const authorizationStatus = useSelector(({ AUTH }: State) => AUTH.authorizationStatus);
  const dispatch = useDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Main} />;
  }

  const getRandomInt = (max: number): number => Math.floor(Math.random() * max);
  const randomCity = cities[getRandomInt(cities.length - 1)];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setCity(randomCity));
    browserHistory.push(AppRoute.Main);
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
      </div>
      <div className="page page--gray page--login">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to="/" className="header__logo-link">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <LoginForm />
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a href={AppRoute.Main} className="locations__item-link" onClick={handleClick}>
                  <span>{randomCity}</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default LoginScreen;
