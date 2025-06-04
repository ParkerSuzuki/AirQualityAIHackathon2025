import React from 'react';

const CITIES = [
  'Alta',
  'Bluffdale',
  'Copperton',
  'Cottonwood Heights',
  'Draper',
  'Emigration Canyon',
  'Granite',
  'Herriman',
  'Holladay',
  'Kearns',
  'Magna',
  'Midvale',
  'Millcreek',
  'Murray',
  'Riverton',
  'Salt Lake City',
  'Sandy city',
  'South Jordan',
  'South Salt Lake',
  'Taylorsville',
  'West Jordan',
  'West Valley City',
  'White City',
];

export default function CitySelector({ selectedCity, onChange }) {
  return (
    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
      <label htmlFor="city-select" style={{ marginRight: '0.5rem', fontWeight: 500 }}>
        Select a city in Salt Lake County:
      </label>
      <select
        id="city-select"
        value={selectedCity}
        onChange={e => onChange(e.target.value)}
        style={{ padding: '0.3rem 1rem', borderRadius: '6px', minWidth: 180 }}
      >
        {CITIES.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}
