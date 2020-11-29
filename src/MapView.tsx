import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import styled from "styled-components";

import Leaflet from 'leaflet';

import AnomalyImage from './icons/anomaly.png';
import { PostData } from "./discussion/mock-data";
import { fetchPostOverview } from "./discussion/api-adapter";
import { Link } from "react-router-dom";

const anomalyIcon = Leaflet.icon({
  iconUrl: AnomalyImage,
  iconRetinaUrl: AnomalyImage,
  shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const StyledMapContainer = styled(MapContainer) <{ $height: number }>`
  height: ${x => x.$height}px;
`;

function UserLocationMarker({location}: { location?: LatLng}) {
  const [position, setPosition] = useState<LatLng | null>(location || null)
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
      map.panTo(e.latlng);
    },
  });

  // Find the user location on mount, then pan to it using the useMapEvents
  // eslint-disable-next-line
  useEffect(() => { if (!position)map.locate() }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

interface IAnomaly { title: string; position: [number, number] };
interface ISensor { position: [number, number] };

export const anomalies: IAnomaly[] = [
  {
    position: [52.3035676, 4.6844564],
    title: 'Increase in water conductivity'
  },
  {
    position: [52.45653, 4.585413],
    title: 'High concentration of NO2'
  },
  {
    position: [52.0792414,4.3413495],
    title: 'Big Boi overload'
  }
];
export const sensors: ISensor[] = [];

const defaultLocation: LatLng = new LatLng(52.4541656,4.5960981); // random residence in IJmuiden
const MapView = () => {


  const [items, setItems] = useState<PostData[]>([])
  const [error, setError] = useState<Error>();
  useEffect(() => {
    fetchPostOverview()
    .then(setItems)
    .catch(setError);
  }, []);


  const [location, setLocation] = useState(defaultLocation);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setLocation(new LatLng(loc.coords.latitude, loc.coords.longitude));
      console.log('Received user location', loc);
    });
  }, []);

  console.log('test', location);
  const wrapper = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapper} >
       {error && <pre>Something went wrong :( <br /> {error.toString() || { unknown: true }}</pre>}
      <StyledMapContainer
        // When location changes, rerender
        // key={location.toString()}
        center={location}
        zoom={15}
        $height={wrapper.current?.clientHeight || window.innerHeight}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* NOTE: passing the location in here fixes the location - the actual user location will not be used */}
        <UserLocationMarker location={location} />

        {items.map(a => (
          <Marker
            position={a.location.coordinates}
            key={a.id}
            icon={anomalyIcon}
          >
            <Popup>
              <h2>{a.title}</h2>
              <Link to={`/posts/${a.id}/data`}>Details</Link>,{' '}
              <Link to={`/posts/${a.id}/dsicuss`}>Discuss</Link>
            </Popup>
          </Marker>
        ))}

      </StyledMapContainer>
    </div>
  )
}

export default MapView;
