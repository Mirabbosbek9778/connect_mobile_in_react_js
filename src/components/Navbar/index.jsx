import { useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const Navbar = (props) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 40.854885,
    lng: -88.081807,
  });

  const style = {
    zindex: "-10",
    marginLeft: "550px",
    marginTop: "10px",
    width: "40%",
    height: "500px",
  };

  const onMapClicked = (mapProps, map, clickEvent) => {
    const newMarkerPosition = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };
    setMarkerPosition(newMarkerPosition);
  };

  const onMarkerDragEnd = (coord) => {
    const newMarkerPosition = {
      lat: coord.latLng.lat(),
      lng: coord.latLng.lng(),
    };
    setMarkerPosition(newMarkerPosition);
  };

  return (
    <div className="relative ">
      <Map
        google={props.google}
        style={style}
        initialCenter={{
          lat: props.locat.lat,
          lng: props.locat.lng,
        }}
        zoom={5}
        onClick={onMapClicked}
      >
        <Marker
          name={"hello"}
          position={markerPosition}
          draggable={true}
          onDragend={onMarkerDragEnd}
        />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD59YY6PcR25dpkpXmyJ-0y_cCkUJYWamI",
})(Navbar);