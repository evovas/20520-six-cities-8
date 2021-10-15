import Header from '../../components/header/header';
import LocationTabs from '../../components/location-tabs/location-tabs';
import {Offer} from '../../types/offers';
import OffersBoard from '../../components/offers-board/offers-board';

type MainPageProps = {
  placesCount: number;
  offers: Offer[];
}

function Main({placesCount, offers}: MainPageProps): JSX.Element {
  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationTabs />
        <div className='cities'>
          <OffersBoard placesCount={placesCount} offers={offers} />
        </div>
      </main>
    </div>
  );
}

export default Main;
