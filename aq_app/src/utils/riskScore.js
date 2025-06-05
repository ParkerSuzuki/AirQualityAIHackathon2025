// Utility to calculate personal risk score from form data
export function calculateRiskScore(formData) {
  let riskScore = 0;
  if (formData.ageGroup === '0-4' || formData.ageGroup === '65+') riskScore += 2;
  if (formData.ageGroup === '5-17') riskScore += 1;
  if (formData.hasLungCondition === 'yes') riskScore += 3;
  if (formData.isPregnant === 'yes') riskScore += 2;
  if (formData.hasHeartCondition === 'yes') riskScore += 2;
  if (formData.outdoorsMoreThanTwoHours === 'yes') riskScore += 1;
  if (formData.activityIntensity === 'hard') riskScore += 2;
  if (formData.activityIntensity === 'moderate') riskScore += 1;
  if (formData.workSetting === 'outdoor') riskScore += 2;
  if (formData.workSetting === 'indoor-windows') riskScore += 1;
  if (formData.smokesOrVapes === 'yes') riskScore += 2;
  if (formData.hasAirPurifier === 'yes') riskScore -= 1;
  // Clamp min to 0
  const minScore = 0;
  const maxScore = 15;
  // Clamp riskScore to [0, maxScore]
  const rawScore = Math.max(minScore, Math.min(riskScore, maxScore));
  const normalizedScore = Math.round((rawScore / maxScore) * 100);
  let invertedScore = 100 - normalizedScore;
  // Clamp final score to [0, 100]
  invertedScore = Math.max(0, Math.min(invertedScore, 100));
  return { rawScore, normalizedScore, invertedScore };
}
