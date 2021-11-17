import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import Favorites from '../../pages/favorites/favorites';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import LoadError from '../../pages/load-error/load-error';
import {AppRoute, AuthorizationStatus, FetchStatus} from '../../const';
import {getOffersStatus} from '../../store/offers/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

function App(): JSX.Element {
  const offersStatus = useSelector(getOffersStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (offersStatus === FetchStatus.Loading) {
    return <Loader size={15} isFullScreen/>;
  }

  if (offersStatus === FetchStatus.Failed) {
    return <LoadError />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites />}
          authorizationStatus={authorizationStatus}
          verifiableStatus={AuthorizationStatus.Auth}
          redirectTo={AppRoute.Login}
        />
        <PrivateRoute
          exact
          path={AppRoute.Login}
          render={() => <Login />}
          authorizationStatus={authorizationStatus}
          verifiableStatus={AuthorizationStatus.NoAuth}
          redirectTo={AppRoute.Root}
        />
        <Route exact path={AppRoute.Room}>
          <Room />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
