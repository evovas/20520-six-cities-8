import LocationTab from '../location-tab/location-tab';
import {CITIES_LIST} from '../../const';

function LocationTabs(): JSX.Element {
  return (
    <div className='tabs' data-testid='location-tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {CITIES_LIST.map((cityName) => <LocationTab key={cityName} cityName={cityName} />)}
        </ul>
      </section>
    </div>
  );
}

export default LocationTabs;
