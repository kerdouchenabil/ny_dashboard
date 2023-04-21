import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

import L from "leaflet";
const iconHome = new L.Icon({
  iconSize: [25 / 2, 41 / 2],
  iconAnchor: [10 / 2, 41 / 2],
  popupAnchor: [2, -40 / 2],
  // specify the path here
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png",
});
export { iconHome };

export default function Map({ tdata, position }) {
  const data = useSelector((globalState) => globalState.airbnbData); //
  console.log(data.length);

  return (
    <div>
      <MapContainer
        style={{ width: "100%", height: "500px" }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((el) => (
          <Marker position={[el.latitude, el.longitude]} icon={iconHome}>
            <Popup>
              Host_name: {el.host_name} <br />
              Room_type: {el.room_type}
              <br />
              Neighbourhood_group: {el.neighbourhood_group}
              <br />
              Price: {el.price} <br />
              Minimum_nights: {el.minimum_nights} <br />
              Number_of_reviews: {el.number_of_reviews}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
