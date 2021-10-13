import Header from '../../components/header/header';
import LocationTabs from '../../components/location-tabs/location-tabs';
import {Offers} from '../../types/offers';
import CardListAndMap from '../../components/card-list-and-map/card-list-and-map';

type MainPageProps = {
  placesCount: number;
  offers: Offers;
}

function Main({placesCount, offers}: MainPageProps): JSX.Element {
  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationTabs />
        <div className='cities'>
          <CardListAndMap placesCount={placesCount} offers={offers} />
        </div>
      </main>
    </div>
  );
}

export default Main;
