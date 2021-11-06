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
import {Review} from '../../types/data';
import {State} from '../../types/state';
import {AppRoute, AuthorizationStatus, FetchStatus} from '../../const';

type AppProps = {
  reviews: Review[];
}

function App({reviews}: AppProps): JSX.Element {
  const offersLoading = useSelector((state: State) => state.offersStatus);
  const offers = useSelector((state: State) => state.offers);

  if (offersLoading === FetchStatus.Loading) {
    return <Loader size={15} isFullScreen/>;
  }

  if (offersLoading === FetchStatus.Failed) {
    return <LoadError />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main offers={offers} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites offers={offers} />}
          authorizationStatus={AuthorizationStatus.Auth}
        />
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <Route exact path={AppRoute.Room}>
          <Room offers={offers} reviews={reviews} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
