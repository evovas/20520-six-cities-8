import {useSelector} from 'react-redux';
import cn from 'classnames';
import Header from '../../components/header/header';
import LocationTabs from '../../components/location-tabs/location-tabs';
import OffersBoard from '../../components/offers-board/offers-board';
import OffersBoardEmpty from '../../components/offers-board-empty/offers-board-empty';
import {getCurrentCityName} from '../../store/ui/selectors';
import {selectOffers} from '../../store/offers/selectors';

function Main(): JSX.Element {
  const currentCityName = useSelector(getCurrentCityName);

  const offers = useSelector(selectOffers);

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className={cn('page__main', 'page__main--index', {'page__main--index-empty': offers.length === 0})}>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationTabs />
        <div className='cities'>
          {
            offers.length > 0
              ? <OffersBoard currentCityOffers={offers} />
              : <OffersBoardEmpty currentCityName={currentCityName} />
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
