import LocationTab from '../location-tab/location-tab';

const CITIES_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function LocationTabs(): JSX.Element {
  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {CITIES_LIST.map((cityName) => <LocationTab key={cityName} cityName={cityName} />)}
        </ul>
      </section>
    </div>
  );
}

export default LocationTabs;
