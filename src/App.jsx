import { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './style.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);

  async function getLocation() {
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;

      const response = await axios.get(API);

      setLocation(response.data[0]);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }

  return (
    <Container className="app-container">

      <Form className="search-form">

        <Form.Control
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search for a city"
        />

        <Button onClick={getLocation}>
          Explore!
        </Button>

      </Form>

      {location && (
        <div style={{ marginTop: '20px' }}>

          <h2>
            The city is: {location.display_name}
          </h2>

          <p>
            <strong>Latitude:</strong>{' '}
            {location.lat}
          </p>

          <p>
            <strong>Longitude:</strong>{' '}
            {location.lon}
          </p>

          <MapContainer
            center={[
              Number(location.lat),
             Number(location.lon)
            ]}
            zoom={13}
            className="map"
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[
                Number(Location.lat),
               Number(location.lon)
              ]}
            >
              <Popup>
                {location.display_name}
              </Popup>
            </Marker>

          </MapContainer>

        </div>
      )}

    </Container>
  );
}

export default App;