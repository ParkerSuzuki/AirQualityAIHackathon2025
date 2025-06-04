import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function AirQualityMap() {
  // Salt Lake City coordinates
  const slc = [40.7608, -111.8910];
  // Example AQI data
  const aqi = 200; // Demo value

  return (
    <div style={{ height: '350px', width: '100%', position: 'relative', zIndex: 0 }}>
      <MapContainer center={slc} zoom={11} style={{ height: '100%', width: '100%', borderRadius: '18px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={slc}
          radius={4000}
          pathOptions={{ color: aqi > 100 ? '#d32f2f' : aqi > 50 ? '#ffa726' : '#43cea2', fillOpacity: 0.4 }}
        />
        <Marker position={slc}>
          <Popup>
            Salt Lake City<br />AQI: {aqi}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default AirQualityMap;
