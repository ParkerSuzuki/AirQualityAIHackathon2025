import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCityAqiForecast } from "../utils/cityCsvAqiUtil";

import { aqiCategory, calculateCompositeScore } from '../utils/personalRiskUtil';

function WeatherComponent({ aqiData: propAqiData, city, loading: propLoading, error: propError, riskScore }) {
  // Debug logging
  console.log('[AirQualityChart] Render for city:', city);
  console.log('[AirQualityChart] aqiData:', propAqiData);

  const [aqiData, setAqiData] = useState(propAqiData || null);
  const [loading, setLoading] = useState(propLoading || false);
  const [error, setError] = useState(propError || null);

  useEffect(() => {
    if (!propAqiData && city) {
      setLoading(true);
      getCityAqiForecast(city)
        .then((data) => {
          setAqiData(data);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "Could not fetch AQI data.");
          setLoading(false);
        });
    } else if (propAqiData) {
      setAqiData(propAqiData);
      setLoading(propLoading || false);
      setError(propError || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, propAqiData]);

  if (loading) {
    return (
      <div className="aqi-chart mb-3 p-3" style={{ width: '100%', maxWidth: 340, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.8s', background: 'transparent', boxShadow: 'none' }}>
        <h4 className="mb-3 text-center" style={{color: '#1976d2', fontWeight: 700, fontSize: 22, letterSpacing: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <i className="fa-solid fa-chart-bar me-2"></i>{city} 10-Day AQI Forecast
        </h4>
        <div className="text-info">Loading AQI forecast...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="aqi-chart mb-3 p-3" style={{ width: '100%', maxWidth: 340, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.8s', background: 'transparent', boxShadow: 'none' }}>
        <h4 className="mb-3 text-center" style={{color: '#1976d2', fontWeight: 700, fontSize: 22, letterSpacing: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <i className="fa-solid fa-chart-bar me-2"></i>{city} 10-Day AQI Forecast
        </h4>
        <div className="text-danger">{error}</div>
      </div>
    );
  }
  if (!aqiData || !Array.isArray(aqiData) || aqiData.length === 0) {
    return (
      <div className="aqi-chart mb-3 p-3" style={{ width: '100%', maxWidth: 340, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.8s', background: 'transparent', boxShadow: 'none' }}>
        <h4 className="mb-3 text-center" style={{color: '#1976d2', fontWeight: 700, fontSize: 22, letterSpacing: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <i className="fa-solid fa-chart-bar me-2"></i>{city} 10-Day AQI Forecast
        </h4>
        <div className="text-warning">No AQI forecast data available.</div>
      </div>
    );
  }
  console.log('[AirQualityChart] aqiData:', aqiData);
  console.log('[AirQualityChart] city:', city);
  const isLong = aqiData.length > 7;
  return (
    <div className="card" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none', width: '100%', maxWidth: 900, animation: 'fadeIn 0.8s'}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))', borderRadius: '12px', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 18px 0px 18px'}}>
        <h4 className="card-title mb-4 text-center" style={{color: '#1976d2', fontWeight: 700, fontSize: 26, letterSpacing: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <i className="fa-solid fa-chart-bar me-2"></i>{city} 10-Day AQI Forecast
        </h4>
        <div className="d-flex justify-content-center align-items-end gap-3 w-100 flex-nowrap" style={{overflowX: isLong ? 'auto' : 'visible', minHeight: 160}}>
          {aqiData.slice(0, 10).map((day, idx) => {
            // If riskScore is provided, use composite score for each day
            const value = (riskScore !== undefined && riskScore !== null)
              ? calculateCompositeScore(day.aqi, riskScore)
              : day.aqi;
            const cat = aqiCategory(value);
            return (
              <div key={idx} className="text-center bg-white" style={{ width: isLong ? 68 : 92, height: 200, borderRadius: 12, boxShadow: '0 2px 12px rgba(116,192,252,0.10)', padding: '10px 6px', margin: '0 2px', border: '1.5px solid #f1f6fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', transition: 'box-shadow 0.2s', cursor: 'default' }}>
                <div style={{ fontWeight: 600, color: '#1976d2', fontSize: isLong ? 15 : 18, marginBottom: 2 }}>{day.label}{riskScore !== undefined && riskScore !== null && <span style={{fontSize: 12, color: '#d32f2f', marginLeft: 4}} title="Personalized">*</span>}</div>
                <div style={{ fontSize: isLong ? 32 : 44, margin: isLong ? '4px 0' : '8px 0', color: cat.color, textShadow: '0 2px 8px #e3f2fd' }}>
                  <i className="fa-solid fa-wind"></i>
                </div>
                <div style={{ fontSize: isLong ? 18 : 26, fontWeight: 700, color: '#222', marginBottom: isLong ? 1 : 2 }}>
                  {Math.round(value)}
                </div>
                <div style={{ fontSize: isLong ? 13 : 15, color: '#888', minHeight: isLong ? 18 : 20, fontWeight: 400 }}>{cat.desc}</div>
                {day.alert && day.alert !== "NO" && (
                  <div style={{ color: "#d32f2f", fontWeight: 600, fontSize: 13, marginTop: 4 }}>ALERT!</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

WeatherComponent.propTypes = {
  aqiData: PropTypes.array,
  city: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default WeatherComponent;
