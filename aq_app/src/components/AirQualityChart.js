import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import WeatherForecast from './WeatherForecast';
import { fetchAqiAndWeather, getWeatherIcon } from '../utils/aqiWeatherApi';
import { SLC_COORDS, SLC_CITY } from '../utils/constants';

function AirQualityChart() {
  const [aqiData, setAqiData] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OWM_API_KEY;
    setLoading(true);
    fetchAqiAndWeather(SLC_CITY, apiKey)
      .then(({ aqiData, weatherForecast }) => {
        setAqiData(aqiData);
        setWeatherForecast(weatherForecast);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Could not fetch AQI or weather data. Showing sample data.");
        setLoading(false);
      });  }, []);

  // AQI to color
  function aqiColor(aqi) {
    if (aqi === 1) return "#43cea2"; // Good
    if (aqi === 2) return "#74C0FC"; // Fair
    if (aqi === 3) return "#ffa726"; // Moderate
    if (aqi === 4) return "#f57c00"; // Poor
    return "#d32f2f"; // Very Poor
  }

  return (
    <div className="card h-100" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-stretch gap-3" style={{minHeight: 320, background: 'rgba(255,255,255,0.7)', borderRadius: 18, boxShadow: '0 2px 10px rgba(116,192,252,0.07)'}}>
          <div className="d-flex flex-column align-items-center justify-content-center" style={{flex: 1, minWidth: 260, maxWidth: 400, borderRight: '1px solid #e3f2fd'}}>
            <WeatherForecast forecast={weatherForecast} />
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center" style={{flex: 1, minWidth: 320, maxWidth: 520}}>
            <h3 className="card-title mb-3 text-center" style={{color: '#1976d2'}}>
              <i className="fa-solid fa-chart-bar me-2"></i>Salt Lake City 5-Day AQI Forecast
            </h3>
            <div style={{width: "100%", overflowX: "auto", height: "350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              {error && aqiData && (
                <div className="alert alert-warning py-2 px-3 mb-2" style={{fontSize: '0.95rem', maxWidth: 340}}>
                  {error}
                </div>
              )}
              {loading ? (
                <div className="text-center w-100">Loading AQI forecast...</div>
              ) : aqiData && aqiData.length ? (
                <div style={{ width: '100%', maxWidth: 400, height: 300 }}>
                  <BarChart
                    width={380}
                    height={220}
                    data={aqiData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
                    style={{ background: '#e3f2fd', borderRadius: 12, boxShadow: '0 2px 6px rgba(116,192,252,0.10)' }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" stroke="#1976d2" />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#1976d2" label={{ value: 'AQI (1-5)', angle: -90, position: 'insideLeft', fill: '#1976d2', dx: -10 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="aqi" name="AQI" radius={[6, 6, 0, 0]}>
                      {aqiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={aqiColor(entry.aqi)} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
              ) : (
                <div className="text-warning w-100">No AQI forecast data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirQualityChart;
