import React from "react";
import WeatherForecast from './WeatherForecast';

import AqiChart from './AqiChart';

function WeatherComponent({ aqiData, weatherForecast, city }) {
  return (
    <div className="card" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
        <div className="d-flex flex-column" style={{minHeight: 320, background: 'rgba(255,255,255,0.1)', borderRadius: 0, boxShadow: 'none'}}>
          <div className="d-flex flex-row w-100 justify-content-center align-items-end gap-3">
            <WeatherForecast forecast={weatherForecast} />
            <AqiChart aqiData={aqiData} city={city} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherComponent;
