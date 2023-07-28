import { useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const Navbar = (props) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 40.854885,
    lng: 66.081807,
  });

  const onMapClicked = (mapProps, map, clickEvent) => {
    const newMarkerPosition = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };
    setMarkerPosition(newMarkerPosition);
  };

  const onMarkerDragEnd = (coord, map, event) => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newMarkerPosition);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-40 " style={{ marginRight: "500px" }}>
        <Map
          style={{
            width: "30%",
            height: "50%",
          }}
          google={props.google}
          initialCenter={{
            lat: 40.854885,
            lng: 66.081807,
          }}
          zoom={5}
          onClick={onMapClicked}
        >
          <Marker
            style={{}}
            name={"hello"}
            position={markerPosition}
            draggable={true}
            onDragend={onMarkerDragEnd}
          />
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD59YY6PcR25dpkpXmyJ-0y_cCkUJYWamI",
})(Navbar);
