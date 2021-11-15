import {useSelector} from 'react-redux';
import cn from 'classnames';
import Header from '../../components/header/header';
import LocationTabs from '../../components/location-tabs/location-tabs';
import OffersBoard from '../../components/offers-board/offers-board';
import OffersBoardEmpty from '../../components/offers-board-empty/offers-board-empty';
import {Offer} from '../../types/data';
import {getCurrentCityName} from '../../store/booking-process/selectors';

type MainPageProps = {
  offers: Offer[];
}

function Main({offers}: MainPageProps): JSX.Element {
  const currentCityName = useSelector(getCurrentCityName);

  const currentCityOffers = offers.filter((offer: Offer) => offer.city.name === currentCityName);

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className={cn('page__main', 'page__main--index', {'page__main--index-empty': currentCityOffers.length === 0})}>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationTabs />
        <div className='cities'>
          {
            currentCityOffers.length > 0
              ? <OffersBoard currentCityOffers={currentCityOffers} />
              : <OffersBoardEmpty currentCityName={currentCityName} />
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
