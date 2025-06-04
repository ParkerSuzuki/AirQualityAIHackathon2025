import React from "react";

function PrivacyNotice() {
  return (
    <div className="text-muted text-center mt-5 mb-3" style={{fontSize: "1rem"}}>
      <i className="fa-solid fa-lock me-2"></i>
      <span>Your information is kept private and is only used to provide personalized recommendations and air quality alerts.</span>
    </div>
  );
}

export default PrivacyNotice;
