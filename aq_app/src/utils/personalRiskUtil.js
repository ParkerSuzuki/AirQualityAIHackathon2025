/**
 * Calculate a user's personal air quality risk based on their riskScore and the current AQI.
 * @param {number} riskScore - User's risk score (e.g., from health form, 0-100 or 1-10 scale)
 * @param {number} aqi - Air Quality Index value (EPA scale, 0-500)
 * @returns {object} { level, description, color, recommendation }
 */
// EPA AQI category utility
export function aqiCategory(aqi) {
  if (aqi <= 50) return { level: 1, desc: "Good", color: "#43cea2", recommendation: "Air quality is good. Enjoy outdoor activities." };
  if (aqi <= 100) return { level: 2, desc: "Moderate", color: "#74C0FC", recommendation: "Air quality is acceptable, but unusually sensitive people should consider limiting prolonged outdoor exertion." };
  if (aqi <= 150) return { level: 3, desc: "Unhealthy for Sensitive Groups", color: "#ffa726", recommendation: "Sensitive groups and high risk individuals should limit time outdoors." };
  if (aqi <= 200) return { level: 4, desc: "Unhealthy", color: "#f57c00", recommendation: "Sensitive groups and those with high risk should stay indoors." };
  if (aqi <= 300) return { level: 5, desc: "Very Unhealthy", color: "#d32f2f", recommendation: "Everyone should avoid outdoor exertion." };
  return { level: 6, desc: "Hazardous", color: "#7e0023", recommendation: "Avoid all outdoor activity. Stay indoors with air filtration." };
}

export function calculatePersonalRisk(riskScore, aqi) {
  // Normalize riskScore to 0-1 (assume 0-100 input, adjust if needed)
  const normRisk = Math.max(0, Math.min(1, riskScore / 100));

  // Use aqiCategory for base AQI info
  const { level: aqiLevel, desc: aqiDesc, color: aqiColor, recommendation } = aqiCategory(aqi);

  // Personal risk logic: amplify AQI risk for higher user riskScore
  // Example: if normRisk > 0.7, bump up the risk category by 1 (unless already max)
  let personalLevel = aqiLevel;
  let personalDesc = aqiDesc;
  let personalColor = aqiColor;
  let personalRecommendation = recommendation;

  if (normRisk > 0.7 && aqiLevel < 6) {
    personalLevel++;
  }
  if (normRisk > 0.7) {
    personalDesc = aqiDesc + " (High Personal Risk)";
    personalColor = "#d32f2f";
    personalRecommendation = "Due to your health risk, avoid outdoor activity and follow medical advice.";
  } else if (normRisk > 0.4 && aqiLevel >= 3) {
    personalDesc = aqiDesc + " (Elevated Personal Risk)";
    personalColor = "#f57c00";
    personalRecommendation = "Consider limiting outdoor exposure, especially if you have symptoms.";
  }

  return {
    level: personalLevel,
    description: personalDesc,
    color: personalColor,
    recommendation: personalRecommendation
  };
}

