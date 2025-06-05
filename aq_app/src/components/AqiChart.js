import React from "react";

function aqiColor(aqi) {
  if (aqi === 1) return "#43cea2"; // Good
  if (aqi === 2) return "#74C0FC"; // Fair
  if (aqi === 3) return "#ffa726"; // Moderate
  if (aqi === 4) return "#f57c00"; // Poor
  return "#d32f2f"; // Very Poor
}

function aqiDescription(aqi) {
  if (aqi === 1) return "Good";
  if (aqi === 2) return "Fair";
  if (aqi === 3) return "Moderate";
  if (aqi === 4) return "Poor";
  return "Very Poor";
}

const AqiChart = ({ aqiData, city }) => (
  <div className="aqi-chart mb-3 p-3" style={{ width: '100%', maxWidth: 340, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.8s', background: 'transparent', boxShadow: 'none' }}>
      <h4 className="mb-3 text-center" style={{color: '#1976d2', fontWeight: 700, fontSize: 22, letterSpacing: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <i className="fa-solid fa-chart-bar me-2"></i>{city} 5-Day AQI Forecast
      </h4>
    <div className="d-flex justify-content-center align-items-end gap-3 w-100">
      {aqiData.map((day, idx) => (
        <div key={idx} className="text-center bg-white" style={{ width: 80, height: 155, borderRadius: 12, boxShadow: '0 1px 8px rgba(116,192,252,0.10)', padding: '12px 8px', margin: '0 2px', border: '1.5px solid #f1f6fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', transition: 'box-shadow 0.2s', cursor: 'default' }}>
          <div style={{ fontWeight: 600, color: '#1976d2', fontSize: 15, marginBottom: 4 }}>{day.label}</div>
          <div style={{ fontSize: 38, margin: '6px 0', color: aqiColor(day.aqi), textShadow: '0 2px 8px #e3f2fd' }}>
            <i className="fa-solid fa-wind"></i>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#222', marginBottom: 2 }}>
            {day.aqi}
          </div>
          <div style={{ fontSize: 13, color: '#888', minHeight: 18, fontWeight: 400 }}>{aqiDescription(day.aqi)}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AqiChart;
