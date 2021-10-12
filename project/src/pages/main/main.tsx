import Header from '../../components/header/header';
import Sorting from '../../components/sorting/sorting';
import LocationTabs from '../../components/location-tabs/location-tabs';
import CardList from '../../components/card-list/card-list';
import {Offers} from '../../types/offers';

type MainPageProps = {
  placesCount: number;
  offers: Offers;
}

function Main({placesCount, offers}: MainPageProps): JSX.Element {
  return (
    <div className='page page--gray page--main'>
      <Header/>
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationTabs/>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{placesCount} places to stay in Amsterdam</b>
              <Sorting/>
              <div className='cities__places-list places__list tabs__content'>
                <CardList offers={offers} cardType={'cities'}/>
              </div>
            </section>
            <div className='cities__right-section'>
              <section className='cities__map map'/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
