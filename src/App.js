import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class App extends Component {
  render() {
    const style = {
      margin:'100px',
      width: "50%",
      height: "600px",
    };

    return (
      <div>
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807,
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >
          <Marker onClick={this.onMarkerClick} name={"hello"} />
          <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD59YY6PcR25dpkpXmyJ-0y_cCkUJYWamI",
})(App);
