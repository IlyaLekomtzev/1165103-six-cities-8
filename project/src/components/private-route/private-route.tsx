import { Route, Redirect } from 'react-router';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../types/state';
import { AppRoute, AuthorizationStatus } from '../../const';

function PrivateRoute(props: RouteProps): JSX.Element {
  const { exact, path, component, children } = props;

  const authorizationStatus = useSelector(({ AUTH }: State) => AUTH.authorizationStatus);

  return (
    <Route exact={exact} path={path} component={component}>
      {authorizationStatus === AuthorizationStatus.Auth
        ?
        (children)
        :
        <Redirect to={AppRoute.Login} />}
    </Route>
  );
}

export default PrivateRoute;
