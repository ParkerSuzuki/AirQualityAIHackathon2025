import React from "react";
import { getWeatherIcon } from '../utils/aqiWeatherApi';

function WeatherForecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return <div className="text-warning">No weather forecast data available.</div>;
  }

  return (
    <div className="weather-forecast mb-3 p-3" style={{ width: '100%', maxWidth: 340, background: '#fff', borderRadius: 16, boxShadow: '0 4px 18px rgba(116,192,252,0.13)', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.8s' }}>
      <h5 className="mb-4 text-center" style={{ color: '#1976d2', fontWeight: 700, letterSpacing: 0.2, fontSize: 22 }}>
        <i className="fa-solid fa-cloud-sun me-2"></i>5-Day Weather Forecast
      </h5>
      <div className="d-flex justify-content-center align-items-end gap-3 w-100">
        {forecast.map((day, idx) => (
          <div key={idx} className="text-center bg-white" style={{ flex: 1, minWidth: 70, borderRadius: 12, boxShadow: '0 1px 8px rgba(116,192,252,0.10)', padding: '12px 8px', margin: '0 2px', border: '1.5px solid #f1f6fa', transition: 'box-shadow 0.2s', cursor: 'default' }}>
            <div style={{ fontWeight: 600, color: '#1976d2', fontSize: 15, marginBottom: 4 }}>{day.label}</div>
            <div style={{ fontSize: 38, margin: '6px 0', color: '#74C0FC', textShadow: '0 2px 8px #e3f2fd' }}>
              <i className={`fa-solid fa-${day.icon || 'cloud'}`}></i>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#222', marginBottom: 2 }}>
              {day.temp}&deg;C
            </div>
            <div style={{ fontSize: 13, color: '#888', minHeight: 18, fontWeight: 400 }}>{day.description}</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .weather-forecast .bg-white:hover { box-shadow: 0 4px 18px rgba(116,192,252,0.17); border-color: #b6e0fe; }
      `}</style>
    </div>
  );
}

export default WeatherForecast;
