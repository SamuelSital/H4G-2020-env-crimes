import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import styled from "styled-components";

const StyledMarker = styled(Marker)`
  filter: hue-rotate(120deg);
`;

const StyledMapContainer = styled(MapContainer) <{ $height: number }>`
  height: ${x => x.$height}px;
`;

function UserLocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
      map.panTo(e.latlng);
    },
  });

  // Find the user location on mount, then pan to it using the useMapEvents
  useEffect(() => void map.locate(), [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

interface IAnomaly { title: string; position: [number, number] };
interface ISensor { position: [number, number] };

const anomalies: IAnomaly[] = [
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

const defaultLocation: LatLng = new LatLng(51.505, -0.09);
const MapView = () => {
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

        <UserLocationMarker />

        {anomalies.map(a => (
          <StyledMarker
            position={a.position}
            css={{ filter: 'hue-rotate(120deg);' }}
            key={a.position.toString()}
          // icon={}
          >
            <Popup>{a.title}</Popup>
          </StyledMarker>
        ))}

      </StyledMapContainer>
    </div>
  )
}

export default MapView;
