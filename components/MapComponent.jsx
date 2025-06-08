// components/MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function MapComponent({ lat, lon }) {
  useEffect(() => {
    // Previne erori de server-side rendering
    if (typeof window !== 'undefined') {
      import('leaflet');
    }
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[lat, lon]} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            IP localizat aici: [{lat.toFixed(2)}, {lon.toFixed(2)}]
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
