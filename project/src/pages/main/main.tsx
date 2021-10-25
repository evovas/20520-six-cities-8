import {connect, ConnectedProps} from 'react-redux';
import cn from 'classnames';
import Header from '../../components/header/header';
import LocationTabs from '../../components/location-tabs/location-tabs';
import OffersBoard from '../../components/offers-board/offers-board';
import OffersBoardEmpty from '../../components/offers-board-empty/offers-board-empty';
import {Offer} from '../../types/offers';
import {State} from '../../types/state';

type MainPageProps = {
  offers: Offer[];
}

const mapStateToProps = ({currentCityName}: State) => ({
  currentCityName,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type ConnectedComponentProps = PropsFromRedux & MainPageProps;

function Main({offers, currentCityName}: ConnectedComponentProps): JSX.Element {
  const currentCityOffers = offers.filter((offer: Offer) => offer.city.name === currentCityName);

  const isCityHasOffers = !!currentCityOffers.length;

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className={cn('page__main', 'page__main--index', {'page__main--index-empty':!isCityHasOffers})}>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationTabs />
        <div className='cities'>
          {
            isCityHasOffers
              ? <OffersBoard currentCityOffers={currentCityOffers} />
              : <OffersBoardEmpty currentCityName={currentCityName} />
          }
        </div>
      </main>
    </div>
  );
}

export default connector(Main);
