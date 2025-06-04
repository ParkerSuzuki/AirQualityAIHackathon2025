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

import { CITIES } from '../utils/constants';

function Dashboard() {
  const [selectedCity, setSelectedCity] = useState('Salt Lake City');

  // Find the selected city from the CITIES array, fallback to SLC if not found
  const cityObj = CITIES.find(c => c.name === selectedCity) || CITIES[0];
  const cityProps = {
    city: cityObj.name, // For display
    center: cityObj.center,
    border: cityObj.border,
    coords: cityObj.center, // Pass lat/lng for AQI fetch
  };

  return (
    <div className="dashboard-container">
      <div className="hero-section mb-4 text-center">
        <h2 className="mb-2" style={{color: '#1976d2'}}><i className="fa-solid fa-wind me-2"></i>BreathSafe Dashboard</h2>
        <CitySelector selectedCity={selectedCity} onChange={setSelectedCity} />
      </div>
      <div className="dashboard-grid mb-4">
        <div className="grid-item map">
          <AirQualityMap {...cityProps} />
        </div>
        <div className="grid-item health">
          <PersonalHealthForm />
        </div>
        <div className="grid-item chart">
          <AirQualityChart />
        </div>
        <div className="grid-item contact">
          <ContactForm />
        </div>
      </div>
      <About />
      <PrivacyNotice />
    </div>
  );
}

export default Dashboard;
