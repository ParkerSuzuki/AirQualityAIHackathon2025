import React from "react";

export default function About() {
  return (
    <div
      className="card mb-3"
      style={{
        boxShadow: "0 4px 12px rgba(116,192,252,0.12)",
        borderRadius: "12px",
        border: "none",
        width: "80vw",
        maxWidth: 1300,
        minWidth: 480,
        margin: 0,
        padding: 0,
        alignSelf: "flex-start"
      }}
    >
      <div
        className="card-body"
        style={{
          background:
            "linear-gradient(to right, rgba(116,192,252,0.04), rgba(116,192,252,0.08))",
        }}
      >
        <h2
          className="card-title text-center mb-3"
          style={{ color: "#1976d2" }}
        >
          <i className="fa-solid fa-info-circle me-2"></i>About BreatheSafe
        </h2>

        {/* Begin: What Can You Do Section */}
        <div
          style={{
            width: "100%",
            minHeight: 320,
            background: "rgba(227,242,253,0.35)",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 1px 4px rgba(116,192,252,0.04)",
            textAlign: "left",
            padding: "2.2rem 2.5rem 2.2rem 2.5rem",
            borderTop: "1px solid #ddd",
            fontFamily: "sans-serif",
            fontSize: "0.97rem",
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
            gap: "3.5rem"
          }}
        >
          {/* Left Section: What Can You Do? */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                marginBottom: "1.2rem",
                fontSize: "1.1rem",
                fontWeight: "bold"
              }}
            >
              What Can You Do?
            </h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '2.5rem', paddingRight: '1.5rem', margin: 0 }}>
              <li style={{ marginBottom: '1.1rem' }}>
                <strong>Reduce Driving:</strong> Even one less car trip during inversion days helps cut pollution.{' '}
                <a href="https://www.rideuta.com/" target="_blank" rel="noopener noreferrer">(rideuta.com)</a>
              </li>
              <li style={{ marginBottom: '1.1rem' }}>
                <strong>Support Clean Air Bills:</strong> Your voice can help pass policies that protect Utah’s air.{' '}
                <a href="https://www.utahcleanair.org/" target="_blank" rel="noopener noreferrer">(utahcleanair.org)</a>
              </li>
              <li>
                <strong>Learn Health Risks:</strong> Poor air increases asthma, heart, and pregnancy risks.{' '}
                <a href="https://www.cdc.gov/air/health.html" target="_blank" rel="noopener noreferrer">(cdc.gov)</a>
              </li>
            </ul>
          </div>
          {/* Divider */}
          <div style={{ width: 2, background: '#e3f2fd', margin: '0 1.2rem' }} />
          {/* Right Section: Why Clean Air Matters */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                marginBottom: "1.2rem",
                fontSize: "1.1rem",
                fontWeight: "bold"
              }}
            >
              Why Clean Air Matters
            </h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '2.5rem', paddingRight: '1.5rem', margin: 0 }}>
              <li style={{ marginBottom: '1.1rem' }}>
                <strong>Better Health:</strong> Clean air reduces risk of asthma, heart disease, and respiratory problems for everyone.
              </li>
              <li style={{ marginBottom: '1.1rem' }}>
                <strong>Clearer Views:</strong> Less pollution means more beautiful mountain and city views in Utah.
              </li>
              <li>
                <strong>Economic Benefits:</strong> Fewer sick days and health costs benefit families and businesses.
              </li>
            </ul>
          </div>
        </div>
        {/* End: What Can You Do Section */}
      </div>
    </div>
  );
}