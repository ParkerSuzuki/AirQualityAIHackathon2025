import React from "react";

export default function About() {
  return (
    <div className="card mb-3" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.12)', borderRadius: '12px', border: 'none', maxWidth: 900, margin: '0 auto'}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.04), rgba(116,192,252,0.08))'}}>
        <h2 className="card-title text-center mb-3" style={{color: '#1976d2'}}>
          <i className="fa-solid fa-info-circle me-2"></i>About BreathSafe
        </h2>
        <p className="text-center mb-0">
          BreathSafe is your personalized dashboard for monitoring air quality and managing health risks in Salt Lake City. Assess your sensitivity, view forecasts, and get tailored recommendations to stay safe and informed.
        </p>
      </div>
    </div>
  );
}
