import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useState } from 'react';
import { City } from '../types/city-type';

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.lat,
          lng: city.location.lng
        },
        zoom: city.location.zoom
      });
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );
      instance.addLayer(layer);
      setMap(instance);
    }
  }, [mapRef,map,city]);
  return map;
}
