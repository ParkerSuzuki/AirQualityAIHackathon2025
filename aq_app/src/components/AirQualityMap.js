import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { fetchAqiAndWeather } from '../utils/aqiWeatherApi';
import { SLC_CITY, SLC_COORDS } from '../utils/constants';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function AirQualityMap() {
  // Salt Lake City coordinates
  const slc = SLC_COORDS;
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OWM_API_KEY;
    setLoading(true);
    fetchAqiAndWeather(SLC_CITY, apiKey)
      .then(({ aqiData }) => {
        // Use the first available AQI value for today
        const today = new Date().toISOString().slice(0, 10);
        const todayAqi = aqiData && aqiData.length > 0
          ? aqiData.find(d => d.date === today)?.aqi || aqiData[0].aqi
          : null;
        setAqi(todayAqi);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Could not fetch AQI data.');
        setLoading(false);
      });
  }, []);

  let circleColor = '#43cea2';
  if (aqi > 100) circleColor = '#d32f2f';
  else if (aqi > 50) circleColor = '#ffa726';

  return (
    <div style={{ height: '350px', width: '100%', position: 'relative', zIndex: 0 }}>
      {loading ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>Loading AQI map...</div>
      ) : error ? (
        <div style={{color: 'red', textAlign: 'center', padding: '2rem'}}>{error}</div>
      ) : (
        <MapContainer center={slc} zoom={11} style={{ height: '100%', width: '100%', borderRadius: '18px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle
            center={slc}
            radius={4000}
            pathOptions={{ color: circleColor, fillOpacity: 0.4 }}
          />
          <Marker position={slc}>
            <Popup>
              Salt Lake City<br />AQI: {aqi}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default AirQualityMap;
