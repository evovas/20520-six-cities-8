import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import Favorites from '../../pages/favorites/favorites';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offers';
import {Review} from '../../types/reviews';
import {Actions} from '../../types/action';
import {State} from '../../types/state';
import {createOffersList} from '../../store/action';
import {AppRoute, AuthorizationStatus} from '../../const';
import {OFFERS} from '../../mocks/offers';

type AppProps = {
  reviews: Review[];
}

const mapStateToProps = ({offers}: State) => ({
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  processOffers(offers: Offer[]) {
    dispatch(createOffersList(offers));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppProps;

function App({offers, reviews, processOffers}: ConnectedComponentProps): JSX.Element {
  processOffers(OFFERS);

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

export {App};
export default connector(App);
