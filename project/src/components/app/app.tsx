import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Offer} from '../../types/offers';
import {Review} from '../../types/reviews';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';

type AppProps = {
  placesCount: number;
  offers: Offer[];
  reviews: Review[];
}

function App({placesCount, offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main placesCount={placesCount} offers={offers} />
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
