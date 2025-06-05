import React, { useState } from 'react';
import { calculateRiskScore } from '../utils/riskScore';
import questions from '../utils/questions';

function PersonalHealthForm({ setRiskAssessmentComplete, onRiskScoreChange, containerHeight }) {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [riskLevel, setRiskLevel] = useState('');
  const [score, setScore] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Calculate risk score using utility
    const { rawScore, normalizedScore, invertedScore } = calculateRiskScore(formData);
    setScore(invertedScore);
    if (onRiskScoreChange) onRiskScoreChange(invertedScore);
    let risk = 'Low';
    if (rawScore >= 8) risk = 'Very High';
    else if (rawScore >= 5) risk = 'High';
    else if (rawScore >= 3) risk = 'Moderate';
    setRiskLevel(risk);
    setFormSubmitted(true);
    if (setRiskAssessmentComplete) setRiskAssessmentComplete(true);
  };


  const resetForm = () => {
    setFormSubmitted(false);
    setRiskLevel('');
    setScore(null);
    if (onRiskScoreChange) onRiskScoreChange(null);
    setFormData({});
    setStep(0);
    if (setRiskAssessmentComplete) setRiskAssessmentComplete(false);
  };

  const currentQ = questions[step];

  const cardHeight = containerHeight || undefined;
  return (
    <div className="card" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none', height: cardHeight}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
        <h3 className="card-title text-center mb-4" style={{color: '#1976d2'}}>
          <i className="fa-solid fa-user-md me-2"></i>
          Personalized Air Quality Risk Assessment
        </h3>
        {formSubmitted ? (
          <div className="text-center">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 32,
              flexWrap: 'wrap',
              marginBottom: 12
            }}>
              {/* SVG Circular Progress Ring */}
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <svg width="180" height="180">
                  <circle
                    cx="90"
                    cy="90"
                    r="74"
                    stroke="#e0e0e0"
                    strokeWidth="18"
                    fill="none"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="74"
                    stroke={score >= 70 ? '#43cea2' : score >= 40 ? '#ffa726' : '#d32f2f'}
                    strokeWidth="18"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 74}
                    strokeDashoffset={2 * Math.PI * 74 * (1 - score / 100)}
                    strokeLinecap="round"
                    style={{transition: 'stroke-dashoffset 0.5s, stroke 0.5s'}}
                    transform="rotate(-90 90 90)"
                  />
                  <text
                    x="90"
                    y="108"
                    textAnchor="middle"
                    fontSize="3.2rem"
                    fill={score >= 70 ? '#43cea2' : score >= 40 ? '#ffa726' : '#d32f2f'}
                    fontWeight="bold"
                  >
                    {score}
                  </text>
                  <text
                    x="90"
                    y="136"
                    textAnchor="middle"
                    fontSize="1.4rem"
                    fill="#1976d2"
                  >
                    /100
                  </text>
                </svg>
              </div>
              <div className={`alert ${riskLevel === 'Low' ? 'alert-success' : riskLevel === 'Moderate' ? 'alert-warning' : 'alert-danger'}`} 
                   style={{maxWidth: '220px', minWidth: '160px', margin: 0, borderRadius: '8px', fontSize: '0.97rem', padding: '12px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h4 className="alert-heading" style={{fontSize: '1.1rem', marginBottom: 8}}>
                  <i className={`fa-solid ${riskLevel === 'Low' ? 'fa-check-circle' : riskLevel === 'Moderate' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle'} me-2`}></i>
                  {riskLevel} Sensitivity Risk
                </h4>
                <p style={{fontSize: '0.95rem', marginBottom: 0}}>Based on your responses, you have a <strong>{riskLevel.toLowerCase()}</strong> sensitivity to poor air quality. 
                  {riskLevel === 'Low' ? 
                    ' You should still monitor air quality, but you are less likely to experience adverse effects from moderate air pollution.' :
                    riskLevel === 'Moderate' ? 
                    ' Consider limiting prolonged outdoor exertion when air quality is poor.' :
                    ' You should take extra precautions and limit outdoor activities when air quality is poor.'}
                </p>
              </div>
              <style>{`
                @media (max-width: 600px) {
                  .text-center > div[style*="display: flex"] {
                    flex-direction: column !important;
                    gap: 12px !important;
                  }
                }
              `}</style>
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
          <form onSubmit={handleNext} className="mx-auto" style={{maxWidth: 420}}>
            <div className="mb-4">
              <label className="form-label" htmlFor={currentQ.name}>{currentQ.label}</label>
              {currentQ.type === 'input' && (
                <input
                  type={currentQ.inputType}
                  className="form-control"
                  id={currentQ.name}
                  name={currentQ.name}
                  value={formData[currentQ.name] || ''}
                  placeholder={currentQ.placeholder}
                  onChange={handleChange}
                  required={currentQ.required}
                  autoFocus
                />
              )}
              {currentQ.type === 'radio' && (
                <div className="d-flex">
                  {currentQ.options.map(opt => (
                    <div className="form-check me-4" key={opt.value}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={currentQ.name}
                        id={currentQ.name + opt.value}
                        value={opt.value}
                        checked={formData[currentQ.name] === opt.value}
                        onChange={handleChange}
                        required={currentQ.required}
                      />
                      <label className="form-check-label" htmlFor={currentQ.name + opt.value}>{opt.label}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{background: 'linear-gradient(135deg, #74C0FC 0%, #1976d2 100%)', borderColor: '#1976d2', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(116,192,252,0.3)'}}
                disabled={!formData[currentQ.name]}
              >
                {step === questions.length - 1 ? (
                  <><i className="fa-solid fa-calculator me-2"></i>Calculate My Risk Level</>
                ) : (
                  <><i className="fa-solid fa-arrow-right me-2"></i>Next</>
                )}
              </button>
            </div>
            <div className="text-center mt-3" style={{color: '#1976d2'}}>
              Question {step + 1} of {questions.length}
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default PersonalHealthForm;

