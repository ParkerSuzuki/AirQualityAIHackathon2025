import React from "react";
import "../App.css";
import AirQualityMap from "./AirQualityMap";
import ContactForm from "./ContactForm";
import PersonalHealthForm from "./PersonalHealthForm";
import PrivacyNotice from "./PrivacyNotice";
import AirQualityChart from './AirQualityChart';
import CitySelector from './CitySelector';
import { useState } from 'react';
import About from './About';
import PersonalRiskBanner from './PersonalRiskBanner';
import { calculateCompositeScore } from '../utils/personalRiskUtil';

import { CITIES } from '../utils/constants';

import { getCityAqiForecast } from '../utils/cityCsvAqiUtil';
import { useEffect } from 'react';

function Dashboard() {
  const [riskAssessmentComplete, setRiskAssessmentComplete] = useState(false);
  const [riskScore, setRiskScore] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Salt Lake City');
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Find the selected city from the CITIES array, fallback to SLC if not found
  const cityObj = CITIES.find(c => c.name === selectedCity) || CITIES[0];
  // Calculate composite AQI if risk assessment is complete
  const todayAqi = aqiData && aqiData.length > 0 ? aqiData[0].aqi : null;
  const [compositeAqi, setCompositeAqi] = useState(todayAqi);

  // Recalculate compositeAqi whenever dependencies change
  useEffect(() => {
    if (riskAssessmentComplete && todayAqi !== null && riskScore !== null) {
      setCompositeAqi(calculateCompositeScore(todayAqi, riskScore, 50, 100, 0.5));
    } else {
      setCompositeAqi(todayAqi);
    }
  }, [todayAqi, riskAssessmentComplete, riskScore]);

  const cityProps = {
    city: cityObj.name, // For display
    center: cityObj.center,
    border: cityObj.border,
    coords: cityObj.center, // Pass lat/lng for AQI fetch
    compositeAqi // Pass to map
  };

  useEffect(() => {
    setLoading(true);
    getCityAqiForecast(cityObj.name)
      .then((aqiData) => {
        setAqiData(aqiData);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Could not fetch AQI data.');
        setLoading(false);
      });
  }, [selectedCity]);

  return (
    <div className="dashboard-container">
      <div className="hero-section mb-0 text-center" style={{marginBottom: 12}}>
        <h2 className="mb-2" style={{color: '#1976d2'}}><i className="fa-solid fa-wind me-2"></i>BreatheSafe Dashboard</h2>
        <CitySelector selectedCity={selectedCity} onChange={setSelectedCity} />
      </div>
      {/* Personal Risk Banner: show only when assessment is complete */}
      {riskAssessmentComplete && riskScore !== null && aqiData && aqiData.length > 0 && (
        <PersonalRiskBanner 
          riskScore={riskScore} 
          aqi={compositeAqi} 
          currentAqi={todayAqi}
          show={true}
          style={{marginTop: 0, marginBottom: 0}}
        />
      )}

      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', gap: '24px'}}>
        <div className="grid-item map" style={{height: 420}}>
          <AirQualityMap {...cityProps} containerHeight={420} />
        </div>
        <div className="grid-item health" style={{height: 420}}>
          <PersonalHealthForm setRiskAssessmentComplete={setRiskAssessmentComplete} onRiskScoreChange={setRiskScore} containerHeight={420} />
        </div>
        <div className="grid-item chart" style={{height: 300}}>
          <AirQualityChart 
            aqiData={aqiData} 
            loading={loading}
            error={error}
            city={cityObj.name}
            riskScore={riskScore}
          />
        </div>
        <div className="grid-item contact" style={{height: 300}}>
          <ContactForm riskAssessmentComplete={riskAssessmentComplete} riskScore={riskScore} />
        </div>
      </div>
      <About />
      <PrivacyNotice />
    </div>
  );
}

export default Dashboard;
