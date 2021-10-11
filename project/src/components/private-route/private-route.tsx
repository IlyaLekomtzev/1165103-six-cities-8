import { Route, Redirect } from 'react-router';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, authorizationStatus, component, children } = props;

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
