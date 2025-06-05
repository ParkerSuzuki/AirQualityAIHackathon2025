import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { getCityAqiForecast } from '../utils/cityCsvAqiUtil';
import { aqiCategory } from '../utils/personalRiskUtil';
import { SLC_CITY, SLC_COORDS, SLC_BORDER } from '../utils/constants';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function AirQualityMap({ city = SLC_CITY, center = SLC_COORDS, border = SLC_BORDER, coords, containerHeight, compositeAqi }) {
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Always use compositeAqi if provided
  const displayAqi = compositeAqi !== undefined && compositeAqi !== null ? compositeAqi : aqi;

  // Fetch AQI only when city changes
  useEffect(() => {
    setLoading(true);
    getCityAqiForecast(city)
      .then((aqiData) => {
        const todayAqi = aqiData && aqiData.length > 0 ? aqiData[0].aqi : null;
        setAqi(todayAqi);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Could not fetch AQI data.');
        setLoading(false);
      });
  }, [city]);

  // Re-render color/info when compositeAqi changes
  const { color: circleColor } = aqiCategory(displayAqi);

  const mapHeight = containerHeight || 350;
  return (
    <div style={{ height: mapHeight, width: '100%', position: 'relative', zIndex: 0 }}>
      {loading ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>Loading AQI map...</div>
      ) : error ? (
        <div style={{color: 'red', textAlign: 'center', padding: '2rem'}}>{error}</div>
      ) : (
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%', borderRadius: '18px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon
            positions={border}
            pathOptions={{ color: circleColor, fillOpacity: 0.2 }}
          />
          <Marker position={center}>
            <Popup>
              <div style={{textAlign: 'center'}}>
                <div style={{fontWeight: 600, fontSize: 18, color: circleColor}}>
                  {compositeAqi !== undefined && compositeAqi !== null ? 'Personalized AQI' : 'AQI'}: {displayAqi !== null && displayAqi !== undefined ? Math.round(displayAqi) : '--'}
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default AirQualityMap;
