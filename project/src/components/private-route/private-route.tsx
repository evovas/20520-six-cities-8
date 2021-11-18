import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Loader from '../loader/loader';

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
      render={() => {
        if (authorizationStatus === AuthorizationStatus.Unknown) {
          return <Loader size={15} isFullScreen />;
        } else if (authorizationStatus === verifiableStatus) {
          return render();
        } else {
          return <Redirect to={redirectTo} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
