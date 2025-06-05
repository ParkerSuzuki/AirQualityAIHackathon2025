import React from "react";
import PropTypes from "prop-types";
import { calculatePersonalRisk, calculateCompositeScore } from "../utils/personalRiskUtil";

import { aqiCategory } from "../utils/personalRiskUtil";

export default function PersonalRiskBanner({ riskScore, aqi, currentAqi, show }) {
  if (!show) return null;
  // Use the provided composite AQI directly
  const category = aqiCategory(aqi);
  return (
    <div className="card" style={{
      width: '100%',
      maxWidth: '100vw',
      borderRadius: 16,
      boxShadow: '0 4px 12px rgba(116,192,252,0.15)',
      background: 'linear-gradient(to right, rgba(116,192,252,0.10), rgba(67,206,162,0.10))',
      border: 'none',
      margin: '0 auto',
      marginTop: 0,
      marginBottom: 0,
      animation: 'fadeIn 0.8s',
      padding: 0
    }}>
      <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between" style={{
        padding: '24px 18px',
        minHeight: 100
      }}>
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <i className="fa-solid fa-user-shield me-3" style={{ fontSize: 40, color: category.color }}></i>
          <div>
            <div style={{ fontWeight: 700, fontSize: 28, color: category.color, letterSpacing: 0.2 }}>
              Personal Air Quality Risk
            </div>
            <div style={{ fontSize: 18, color: '#222', fontWeight: 500 }}>
              {category.desc}
            </div>
          </div>
        </div>
        <div className="text-center mt-3 mt-md-0">
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1976d2' }}>
            Your Risk Score: <span style={{ color: category.color }}>{riskScore}</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1976d2' }}>
            Current AQI: <span style={{ color: category.color }}>{currentAqi !== null && currentAqi !== undefined ? Math.round(currentAqi) : '--'}</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1976d2' }}>
            Composite AQI: <span style={{ color: category.color }}>{aqi !== null && aqi !== undefined ? Math.round(aqi) : '--'}</span>
          </div>
          {/* Composite Risk Score is the same as Composite AQI, so we can omit or show just Composite AQI above */}
          <div style={{ fontSize: 16, color: category.color, marginTop: 8, maxWidth: 440 }}>
            {category.recommendation}
          </div>
        </div>
      </div>
    </div>
  );
}

PersonalRiskBanner.propTypes = {
  riskScore: PropTypes.number.isRequired,
  aqi: PropTypes.number.isRequired, // composite AQI
  currentAqi: PropTypes.number, // current AQI
  show: PropTypes.bool.isRequired
};
