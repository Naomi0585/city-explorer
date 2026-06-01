import { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <input 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search for a city" 
        style={{ padding: '10px', marginRight: '10px' }}
      />
      <button onClick={getLocation} style={{ padding: '10px' }}>Explore!</button>

      {location && (
        <div style={{ marginTop: '20px' }}>
          <h2>The city is: {location.display_name}</h2>
          <p><strong>Latitude:</strong> {location.lat}</p>
          <p><strong>Longitude:</strong> {location.lon}</p>

          <MapContainer 
            center={[location.lat, location.lon]} 
            zoom={13} 
            style={{ height: '300px', width: '80%', margin: 'auto' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lon]}>
              <Popup>{location.display_name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default App;
