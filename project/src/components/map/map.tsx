import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../types/offers';
import useMap from '../../hooks/useMap';
import './map.css';
import {URL_MARKER_ACTIVE, URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  offers: Offer[];
  city: City;
  activeCardID: number | null;
}

function Map({offers, city, activeCardID}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const activeIcon = leaflet.icon({
    iconUrl: URL_MARKER_ACTIVE,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const {latitude, longitude} = offer.location;
        leaflet.marker({
          lat: latitude,
          lng: longitude,
        }, {
          icon: activeCardID !== undefined && activeCardID === offer.id ? activeIcon : defaultIcon,
        })
          .addTo(map);
      });
    }
  }, [map, offers, activeCardID]);

  return (
    <div className='cities__right-section'>
      <section className='cities__map map' ref={mapRef} />
    </div>
  );
}

export default Map;

