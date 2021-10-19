import {useEffect, useRef} from 'react';
import leaflet, {Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {City, Offer} from '../../types/offers';
import 'leaflet/dist/leaflet.css';
import './map.css';

type MapProps = {
  offers: Offer[];
  city: City;
  activeCardId?: number | null;
}

const URL_MARKER_DEFAULT = '../img/pin.svg';
const URL_MARKER_ACTIVE = '../img/pin-active.svg';

function Map({offers, city, activeCardId}: MapProps): JSX.Element {
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
    const points: Marker[] = [];

    if (map) {
      offers.forEach((offer) => {
        const {latitude, longitude} = offer.location;

        const point = leaflet.marker({
          lat: latitude,
          lng: longitude,
        }, {
          icon: activeCardId === offer.id ? activeIcon : defaultIcon,
        })
          .addTo(map);

        points.push(point);
      });
    }

    return () => points.forEach((point) => point.remove());
  }, [map, offers, activeCardId]);

  return (
    <div className='cities__right-section'>
      <section className='cities__map map' ref={mapRef} />
    </div>
  );
}

export default Map;

