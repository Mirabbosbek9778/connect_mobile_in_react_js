import { useEffect, useState } from "react";

const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrent(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setError("Unable to retrieve your location");
        console.error(error);
      }
    );
  }, []);

  return (
    <div>
      {latitude && longitude ? (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      ) : (
        <p>{error || "Fetching your location..."}</p>
      )}
    </div>
  );
};

function AppLocations() {
  return (
    <div className="App">
      <h1>My Location</h1>
      <LocationComponent />
    </div>
  );
}

export default AppLocations;