import React from "react";
import "../App.css";
import AirQualityMap from "./AirQualityMap";
import ContactForm from "./ContactForm";
import PersonalHealthForm from "./PersonalHealthForm";
import PrivacyNotice from "./PrivacyNotice";
import AirQualityChart from './AirQualityChart';
import About from './About';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="hero-section mb-4 text-center">
        <h2 className="mb-2" style={{color: '#1976d2'}}><i className="fa-solid fa-wind me-2"></i>BreathSafe Dashboard</h2>
      </div>
      <div className="dashboard-grid mb-4">
        <div className="grid-item map">
          <AirQualityMap />
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
