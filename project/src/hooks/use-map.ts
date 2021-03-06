import { useEffect, useState } from 'react';
import leaflet, { Map } from 'leaflet';
import { Location } from '../types/offers';

type mapType = Map | null;

function useMap(mapRef: React.RefObject<HTMLInputElement>, city: Location): mapType {
  const [map, setMap] = useState<mapType>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: city.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }

    if (mapRef.current !== null && map !== null) {
      map.setView([city.latitude, city.longitude], city.zoom);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
