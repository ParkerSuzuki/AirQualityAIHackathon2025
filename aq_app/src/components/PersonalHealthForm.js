import React, { useState } from 'react';

function PersonalHealthForm() {
  const [formData, setFormData] = useState({
    zipCode: '',
    ageGroup: '',
    hasLungCondition: '',
    outdoorsMoreThanTwoHours: '',
    isPregnant: '',
    hasHeartCondition: '',
    activityIntensity: '',
    workSetting: '',
    smokesOrVapes: '',
    hasAirPurifier: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [riskLevel, setRiskLevel] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple algorithm to calculate risk level based on answers
    let riskScore = 0;
    
    // Age-related risk
    if (formData.ageGroup === '0-4' || formData.ageGroup === '65+') riskScore += 2;
    if (formData.ageGroup === '5-17') riskScore += 1;
    
    // Health conditions
    if (formData.hasLungCondition === 'yes') riskScore += 3;
    if (formData.isPregnant === 'yes') riskScore += 2;
    if (formData.hasHeartCondition === 'yes') riskScore += 2;
    
    // Activity and exposure
    if (formData.outdoorsMoreThanTwoHours === 'yes') riskScore += 1;
    if (formData.activityIntensity === 'hard') riskScore += 2;
    if (formData.activityIntensity === 'moderate') riskScore += 1;
    if (formData.workSetting === 'outdoor') riskScore += 2;
    if (formData.workSetting === 'indoor-windows') riskScore += 1;
    
    // Habits
    if (formData.smokesOrVapes === 'yes') riskScore += 2;
    if (formData.hasAirPurifier === 'yes') riskScore -= 1;
    
    // Determine risk level
    let risk = 'Low';
    if (riskScore >= 8) risk = 'Very High';
    else if (riskScore >= 5) risk = 'High';
    else if (riskScore >= 3) risk = 'Moderate';
    
    setRiskLevel(risk);
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setRiskLevel('');
  };

  return (
    <div className="card" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
        <h3 className="card-title text-center mb-4" style={{color: '#1976d2'}}>
          <i className="fa-solid fa-user-md me-2"></i>
          Personalized Air Quality Risk Assessment
        </h3>
        
        {formSubmitted ? (
          <div className="text-center">
            <div className={`alert ${riskLevel === 'Low' ? 'alert-success' : riskLevel === 'Moderate' ? 'alert-warning' : 'alert-danger'}`} 
                 style={{maxWidth: '400px', margin: '0 auto', borderRadius: '8px'}}>
              <h4 className="alert-heading">
                <i className={`fa-solid ${riskLevel === 'Low' ? 'fa-check-circle' : riskLevel === 'Moderate' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle'} me-2`}></i>
                {riskLevel} Sensitivity Risk
              </h4>
              <p>Based on your responses, you have a <strong>{riskLevel.toLowerCase()}</strong> sensitivity to poor air quality.</p>
              <hr />
              <p className="mb-0">
                {riskLevel === 'Low' ? 
                  'You should still monitor air quality, but you are less likely to experience adverse effects from moderate air pollution.' :
                  riskLevel === 'Moderate' ? 
                  'Consider limiting prolonged outdoor exertion when air quality is poor.' :
                  'You should take extra precautions and limit outdoor activities when air quality is poor.'}
              </p>
            </div>
            <button 
              className="btn btn-outline-primary mt-4" 
              onClick={resetForm}
              style={{borderColor: '#1976d2', color: '#1976d2'}}
            >
              <i className="fa-solid fa-redo me-2"></i>
              Retake Assessment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="zipCode" className="form-label">What is your ZIP or postal code?</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="ageGroup" className="form-label">What is your age group?</label>
                <select 
                  className="form-select" 
                  id="ageGroup" 
                  name="ageGroup" 
                  value={formData.ageGroup} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your age group</option>
                  <option value="0-4">0–4 years</option>
                  <option value="5-17">5–17 years</option>
                  <option value="18-64">18–64 years</option>
                  <option value="65+">65+ years</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Do you have asthma or any other chronic lung condition?</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="lungYes" 
                      name="hasLungCondition" 
                      value="yes" 
                      checked={formData.hasLungCondition === 'yes'} 
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="lungYes">Yes</label>
                  </div>
                  <div className="form-check">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="lungNo" 
                      name="hasLungCondition" 
                      value="no" 
                      checked={formData.hasLungCondition === 'no'} 
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="lungNo">No</label>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Will you be outdoors for more than two hours?</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="outdoorsYes" 
                      name="outdoorsMoreThanTwoHours" 
                      value="yes" 
                      checked={formData.outdoorsMoreThanTwoHours === 'yes'} 
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="outdoorsYes">Yes</label>
                  </div>
                  <div className="form-check">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="outdoorsNo" 
                      name="outdoorsMoreThanTwoHours" 
                      value="no" 
                      checked={formData.outdoorsMoreThanTwoHours === 'no'} 
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="outdoorsNo">No</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Are you pregnant?</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="pregnantYes" 
                      name="isPregnant" 
                      value="yes" 
                      checked={formData.isPregnant === 'yes'} 
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="pregnantYes">Yes</label>
                  </div>
                  <div className="form-check">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="pregnantNo" 
                      name="isPregnant" 
                      value="no" 
                      checked={formData.isPregnant === 'no'} 
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="pregnantNo">No</label>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Do you have heart disease, high blood pressure, or diabetes?</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="heartYes" 
                      name="hasHeartCondition" 
                      value="yes" 
                      checked={formData.hasHeartCondition === 'yes'} 
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="heartYes">Yes</label>
                  </div>
                  <div className="form-check">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="heartNo" 
                      name="hasHeartCondition" 
                      value="no" 
                      checked={formData.hasHeartCondition === 'no'} 
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="heartNo">No</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="activityIntensity" className="form-label">How intense will your outdoor activity be?</label>
                <select 
                  className="form-select" 
                  id="activityIntensity" 
                  name="activityIntensity" 
                  value={formData.activityIntensity} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select activity level</option>
                  <option value="light">Light (walking)</option>
                  <option value="moderate">Moderate (jogging)</option>
                  <option value="hard">Hard (intense workout)</option>
                </select>
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="workSetting" className="form-label">What is your typical work setting?</label>
                <select 
                  className="form-select" 
                  id="workSetting" 
                  name="workSetting" 
                  value={formData.workSetting} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select work setting</option>
                  <option value="indoor-ac">Mostly indoor with A/C</option>
                  <option value="indoor-windows">Indoor with open windows</option>
                  <option value="outdoor">Mostly outdoor</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Do you smoke or vape?</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="smokeYes" 
                      name="smokesOrVapes" 
                      value="yes" 
                      checked={formData.smokesOrVapes === 'yes'} 
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="smokeYes">Yes</label>
                  </div>
                  <div className="form-check">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="smokeNo" 
                      name="smokesOrVapes" 
                      value="no" 
                      checked={formData.smokesOrVapes === 'no'} 
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="smokeNo">No</label>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Do you have an air purifier you can run?</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="purifierYes" 
                      name="hasAirPurifier" 
                      value="yes" 
                      checked={formData.hasAirPurifier === 'yes'} 
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="purifierYes">Yes</label>
                  </div>
                  <div className="form-check">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      id="purifierNo" 
                      name="hasAirPurifier" 
                      value="no" 
                      checked={formData.hasAirPurifier === 'no'} 
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="purifierNo">No</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="d-grid gap-2 mt-4">
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{
                  background: 'linear-gradient(135deg, #74C0FC 0%, #1976d2 100%)', 
                  borderColor: '#1976d2', 
                  padding: '10px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 5px rgba(116,192,252,0.3)'
                }}
              >
                <i className="fa-solid fa-calculator me-2"></i>
                Calculate My Risk Level
              </button>
            </div>
          </form>
        )}
        
        <div className="text-muted mt-3 text-center" style={{fontSize: "0.9rem"}}>
          <i className="fa-solid fa-lock me-1"></i>
          Your information is kept private and is only used to provide personalized recommendations.
        </div>
      </div>
    </div>
  );
}

export default PersonalHealthForm;
