import { Switch, Route, Redirect } from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <MainScreen />
      </Route>
      <Route path={AppRoute.Login} exact>
        <LoginScreen />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.Favorites}
      >
        <FavoritesScreen />
      </PrivateRoute>
      <Route path={AppRoute.Room} exact>
        <RoomScreen />
      </Route>
      <Route path={AppRoute.NotFound} exact>
        <NotFoundScreen />
      </Route>
      <Redirect to={AppRoute.NotFound} />
    </Switch>
  );
}

export default App;
