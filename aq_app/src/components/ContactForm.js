import React, { useState } from 'react';

function ContactForm() {
  const [contactInfo, setContactInfo] = useState('');
  const [contactType, setContactType] = useState('email');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactInfo) {
      setError('Please enter your contact information');
      return;
    }

    if (contactType === 'email' && !contactInfo.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (contactType === 'phone' && !/^\d{10}$/.test(contactInfo.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Clear any previous errors
    setError('');
    
    // In a real app, you would send this to your backend
    console.log('Contact info submitted:', { contactType, contactInfo });
    
    // Show success message
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setContactInfo('');
    }, 3000);
  };

  return (
    <div className="card" style={{boxShadow: '0 4px 12px rgba(116,192,252,0.15)', borderRadius: '12px', border: 'none'}}>
      <div className="card-body" style={{background: 'linear-gradient(to right, rgba(116,192,252,0.05), rgba(116,192,252,0.1))'}}>
        <h4 className="card-title mb-3 text-center" style={{color: '#1976d2'}}>
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
            <div className="mb-3">
              <label className="form-label">How would you like to receive alerts?</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactType"
                    id="emailOption"
                    checked={contactType === 'email'}
                    onChange={() => setContactType('email')}
                  />
                  <label className="form-check-label" htmlFor="emailOption">
                    Email
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactType"
                    id="phoneOption"
                    checked={contactType === 'phone'}
                    onChange={() => setContactType('phone')}
                  />
                  <label className="form-check-label" htmlFor="phoneOption">
                    SMS
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="contactInfo" className="form-label">
                {contactType === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <input
                type={contactType === 'email' ? 'email' : 'tel'}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="contactInfo"
                placeholder={contactType === 'email' ? 'you@example.com' : '(555) 555-5555'}
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
            
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" style={{background: 'linear-gradient(135deg, #74C0FC 0%, #1976d2 100%)', borderColor: '#1976d2', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(116,192,252,0.3)'}}>
                <i className="fa-solid fa-paper-plane me-2"></i>
                Subscribe to Alerts
              </button>
            </div>
          </form>
        )}
  
      </div>
    </div>
  );
}

export default ContactForm;
