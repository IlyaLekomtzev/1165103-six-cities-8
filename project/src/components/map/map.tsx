import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/offers';
import { MapIcon } from '../../const';

type mapPropsTypes = {
  city: City;
  offers: Offer[];
  active: number;
}

function Map({ city, offers, active }: mapPropsTypes): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: MapIcon.Default,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  //eslint-disable-next-line
  const currentCustomIcon = leaflet.icon({
    iconUrl: MapIcon.Current,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === active) ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, active]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    />
  );
}

export default Map;
