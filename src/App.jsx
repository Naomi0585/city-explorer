import { useState } from 'react';
import axios from 'axios';

import {
  Container,
  Form,
  Button,
  Card,
  Alert
} from 'react-bootstrap';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './style.css';

function App() {
  const apiKey = import.meta.env.VITE_LOCATIONIQ_KEY;

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  async function getLocation() {

    // Clear any previous errors
    setError(null);

    // Check for empty input
    if (!searchQuery.trim()) {
      setLocation(null);

      setError({
        status: 400,
        message: 'Please enter a city.'
      });

      return;
    }

    try {

      const API = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${searchQuery}&format=json`;

      const response = await axios.get(API);

      setLocation(response.data[0]);

    } catch (error) {

      console.error('Error fetching location:', error);

      setLocation(null);

      setError({
        status: error.response?.status || 'Unknown',
        message:
          error.response?.data?.error ||
          'Unable to retrieve location.'
      });

    }
  }

  return (
    <Container className="app-container">

      <h1 className="text-center my-4">
        City Explorer
      </h1>

      <Form className="search-form">

        <Form.Control
          type="text"
          placeholder="Search for a city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          type="button"
          onClick={getLocation}
        >
          Explore!
        </Button>

      </Form>

      {error && (
        <Alert
          variant="danger"
          className="mt-3"
        >
          <Alert.Heading>
            Error
          </Alert.Heading>

          <p>
            <strong>Status:</strong> {error.status}
          </p>

          <p>
            <strong>Message:</strong> {error.message}
          </p>
        </Alert>
      )}

      {location && (

        <Card className="location-box mt-4 shadow">

          <Card.Body>

            <Card.Title>
              {location.display_name}
            </Card.Title>

            <Card.Text>
              <strong>Latitude:</strong> {location.lat}
            </Card.Text>

            <Card.Text>
              <strong>Longitude:</strong> {location.lon}
            </Card.Text>

            <MapContainer
              center={[
                Number(location.lat),
                Number(location.lon)
              ]}
              zoom={13}
              className="map"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
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

          </Card.Body>

        </Card>

      )}

    </Container>
  );
}

export default App;