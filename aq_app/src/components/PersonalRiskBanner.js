import React from "react";
import PropTypes from "prop-types";
import { calculatePersonalRisk, calculateCompositeScore } from "../utils/personalRiskUtil";

export default function PersonalRiskBanner({ riskScore, aqi, show }) {
  if (!show) return null;
  const risk = calculatePersonalRisk(riskScore, aqi);
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
          <i className="fa-solid fa-user-shield me-3" style={{ fontSize: 40, color: risk.color }}></i>
          <div>
            <div style={{ fontWeight: 700, fontSize: 28, color: risk.color, letterSpacing: 0.2 }}>
              Personal Air Quality Risk
            </div>
            <div style={{ fontSize: 18, color: '#222', fontWeight: 500 }}>
              {risk.description}
            </div>
          </div>
        </div>
        <div className="text-center mt-3 mt-md-0">
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1976d2' }}>
            Your Risk Score: <span style={{ color: risk.color }}>{riskScore}</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1976d2' }}>
            Current AQI: <span style={{ color: risk.color }}>{aqi !== null ? Math.round(aqi) : '--'}</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1976d2' }}>
            Composite Risk Score: <span style={{ color: risk.color }}>{(aqi !== null && riskScore !== null) ? calculateCompositeScore(aqi, riskScore) : '--'}</span>
          </div>
          <div style={{ fontSize: 16, color: '#555', marginTop: 8, maxWidth: 440 }}>
            {risk.recommendation}
          </div>
        </div>
      </div>
    </div>
  );
}

PersonalRiskBanner.propTypes = {
  riskScore: PropTypes.number.isRequired,
  aqi: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired
};
