import React from "react";

function WeatherForecast({ forecast }) {
  return (
    <div className="weather-forecast mb-3 p-3" style={{ width: '100%', maxWidth: 340, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.8s', background: 'transparent', boxShadow: 'none' }}>
        <h4 className="mb-3 text-center" style={{color: '#1976d2', fontWeight: 700, fontSize: 22, letterSpacing: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <i className="fa-solid fa-cloud-sun me-2"></i>5-Day Weather Forecast
        </h4>
      <div className="d-flex justify-content-center align-items-end gap-3 w-100">
        {forecast.map((day, idx) => (
          <div key={idx} className="text-center bg-white" style={{ width: 80, height: 155, borderRadius: 12, boxShadow: '0 1px 8px rgba(116,192,252,0.10)', padding: '12px 8px', margin: '0 2px', border: '1.5px solid #f1f6fa', transition: 'box-shadow 0.2s', cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
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
    </div>
  );
}

export default WeatherForecast;
