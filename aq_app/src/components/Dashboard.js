import React from "react";
import "../App.css";
import AirQualityMap from "./AirQualityMap";
import ContactForm from "./ContactForm";
import PersonalHealthForm from "./PersonalHealthForm";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Main Content */}
          <main className="col-md-12">
            <div className="hero-section mb-4 text-center">
              <h2 className="mb-2" style={{color: '#1976d2'}}><i className="fa-solid fa-wind me-2"></i>BreathSafe Dashboard</h2>
            </div>

            <div className="card mb-4" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
              <div className="card-body">
                <h3 className="card-title text-center" style={{color: '#1976d2'}}><i className="fa-solid fa-info-circle me-2"></i>About BreathSafe</h3>
                <p className="card-text">
                  BreathSafe is a comprehensive air quality monitoring dashboard that helps you track and understand air quality conditions in Salt Lake City. 
                  Our interactive map and detailed charts provide real-time data on air pollutants, helping you make informed decisions about outdoor activities.
                </p>
                <p className="card-text">
                  <strong>Features:</strong> Real-time air quality monitoring, historical data analysis, interactive map visualization, and personalized alerts for sensitive groups.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-center mb-3" style={{color: '#1976d2'}}><i className="fa-solid fa-user-check me-2"></i>Personalize Your Experience</h3>
              <PersonalHealthForm />
            </div>

            <div className="mb-4" style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', width: '100%'}}>
              {/* Placeholder Chart */}
              <div style={{flex: '1', maxWidth: '33%', width: '33%'}}>
                <div className="card h-100" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
                  <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
                    <h3 className="card-title mb-3 text-center" style={{color: '#1976d2'}}><i className="fa-solid fa-chart-bar me-2"></i>Sample Air Quality Chart For This Week in Salt Lake City</h3>
                    <div style={{width: "100%", overflowX: "auto", height: "350px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                      <svg width="100%" height="100%" viewBox="0 0 380 220" style={{maxWidth: 380, background: '#e3f2fd', borderRadius: 12, boxShadow: '0 2px 6px rgba(116,192,252,0.10)'}}>
                        {/* X and Y Axis */}
                        <line x1="40" y1="20" x2="40" y2="180" stroke="#1976d2" strokeWidth="2" />
                        <line x1="40" y1="180" x2="350" y2="180" stroke="#1976d2" strokeWidth="2" />
                        {/* Bars */}
                        <rect x="60" y="80" width="30" height="100" fill="#74C0FC" rx="5" />
                        <rect x="110" y="60" width="30" height="120" fill="#1976d2" rx="5" />
                        <rect x="160" y="100" width="30" height="80" fill="#2196f3" rx="5" />
                        <rect x="210" y="50" width="30" height="130" fill="#74C0FC" rx="5" />
                        <rect x="260" y="120" width="30" height="60" fill="#1976d2" rx="5" />
                        {/* Labels */}
                        <text x="75" y="200" fontSize="14" fill="#1976d2">Mon</text>
                        <text x="125" y="200" fontSize="14" fill="#1976d2">Tue</text>
                        <text x="175" y="200" fontSize="14" fill="#1976d2">Wed</text>
                        <text x="225" y="200" fontSize="14" fill="#1976d2">Thu</text>
                        <text x="275" y="200" fontSize="14" fill="#1976d2">Fri</text>
                        {/* Y Axis Label */}
                        <text x="0" y="110" fontSize="14" fill="#1976d2" transform="rotate(-90 20 110)">AQI</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Air Quality Map */}
              <div style={{flex: '2', maxWidth: '67%', width: '67%'}}>
                <div className="card h-100" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
                  <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
                    <h3 className="card-title mb-3 text-center" style={{color: '#1976d2'}}><i className="fa-solid fa-map-location-dot me-2"></i>Salt Lake City Air Quality Map</h3>
                    <div style={{height: '350px'}}>
                      <AirQualityMap />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <h3 className="text-center mb-3" style={{color: '#1976d2'}}><i className="fa-solid fa-envelope-open-text me-2"></i>Stay Informed</h3>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
