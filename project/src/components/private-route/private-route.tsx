import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
  verifiableStatus: AuthorizationStatus;
  redirectTo: AppRoute;
}

function PrivateRoute({exact, path, render, authorizationStatus, verifiableStatus, redirectTo}: PrivateRouteProps): JSX.Element {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === verifiableStatus
          ? render()
          : <Redirect to={redirectTo} />
      )}
    />
  );
}

export default PrivateRoute;
