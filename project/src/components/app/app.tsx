import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offers';

type AppPropsTypes = {
  offers: Offer[];
};

function App({ offers }: AppPropsTypes): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainScreen offers={offers} />
        </Route>
        <Route path={AppRoute.Login} exact>
          <LoginScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
          <FavoritesScreen offers={offers} />
        </PrivateRoute>
        <Route path={AppRoute.Room} exact>
          <RoomScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
