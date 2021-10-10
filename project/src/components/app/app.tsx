import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoute } from '../../const';

type propsTypes = {
  offersCount: number
};

function App({ offersCount }: propsTypes): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainScreen offersCount={offersCount} />
        </Route>
        <Route path={AppRoute.Login} exact>
          <LoginScreen />
        </Route>
        <Route path={AppRoute.Favorites} exact>
          <FavoritesScreen />
        </Route>
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
