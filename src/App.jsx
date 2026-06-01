import { useState } from 'react';
import axios from 'axios';

import { Container, Form, Button } from 'react-bootstrap';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './style.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);

  async function getLocation() {

    if (!searchQuery.trim()) {
      alert('Please enter a place');
      return;
    }
    try {
      const API =
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;

      const response =
        await axios.get(API);

      setLocation(response.data[0]);

    } catch (error) {
      console.error(
        'Error fetching location:',
        error
      );
    }
  }

  return (
    <Container className="app-container">

      <Form className="search-form">

        <Form.Control
        type='text'
          placeholder="Search for a city"
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(
              e.target.value
            )
          }
        />

        <Button
        type='button'
          onClick={getLocation}
        >
          Explore!
        </Button>

      </Form>

      {location && (
        <div className="location-box">

          <h2>
            The city is:
            {' '}
            {location.display_name}
          </h2>

          <p>
            <strong>Latitude:</strong>
            {' '}
            {location.lat}
          </p>

          <p>
            <strong>Longitude:</strong>
            {' '}
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
                Number(location.lat),
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