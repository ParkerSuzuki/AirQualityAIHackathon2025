import React, { useState } from 'react';
import { registerForNotifications } from '../utils/notificationApi';

function ContactForm({ riskAssessmentComplete, riskScore }) {
  const [contactInfo, setContactInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    // Require at least one contact method
    if (!contactInfo && !phone) {
      setError('Please enter your email address or phone number');
      return;
    }
    // If email provided, validate format
    if (contactInfo && !contactInfo.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    // If phone provided, basic validation (10+ digits)
    if (phone && !/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }

    setError('');
    setLoading(true);

    try {
      console.log("Submitting email to notification API:", { email: contactInfo, riskScore });
      await registerForNotifications({ email: contactInfo, phone, riskScore });
      setSubmitted(true);
      setContactInfo('');
      setPhone('');
    } catch (err) {
      setError(err.message || 'Failed to register for notifications.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="card" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
        <h4 className="card-title mb-4 text-center" style={{color: '#1976d2', fontWeight: 700, fontSize: 26, letterSpacing: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <i className="fa-solid fa-bell me-2"></i>
          Get Air Quality Alerts
        </h4>
        
        {submitted ? (
          <div className="alert alert-success" style={{background: 'rgba(116,192,252,0.2)', color: '#1976d2', border: '1px solid rgba(116,192,252,0.3)'}}>
            <i className="fa-solid fa-circle-check me-2"></i>
            Thank you! We'll send you air quality alerts for Salt Lake City.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {loading && (
              <div className="mb-2 text-center">
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </div>
            )}

            
            <div className="mb-3">
              <label htmlFor="contactInfo" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control${error && !phone ? ' is-invalid' : ''}`}
                id="contactInfo"
                placeholder="you@example.com"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className={`form-control${error && !contactInfo ? ' is-invalid' : ''}`}
                id="phone"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
            
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" style={{background: 'linear-gradient(135deg, #74C0FC 0%, #1976d2 100%)', borderColor: '#1976d2', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(116,192,252,0.3)'}} disabled={!riskAssessmentComplete}>
                <i className="fa-solid fa-paper-plane me-2"></i>
                Subscribe to Alerts
              </button>
            </div>
            {!riskAssessmentComplete && (
              <div className="alert alert-warning mt-2" style={{fontSize: '0.95rem'}}>
                Please complete the Risk Assessment above before subscribing to alerts.
              </div>
            )}
          </form>
        )}
  
      </div>
    </div>
  );
}

export default ContactForm;
