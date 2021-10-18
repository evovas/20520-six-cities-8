import {MutableRefObject, useEffect, useState} from 'react';
import leaflet from 'leaflet';
import {Map} from 'leaflet';
import {City} from '../types/offers';

const URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const {latitude, longitude, zoom} = city.location;

    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      leaflet
        .tileLayer(
          URL_TEMPLATE,
          {
            attribution: ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
