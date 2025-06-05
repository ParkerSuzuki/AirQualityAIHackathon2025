export async function registerForNotifications({ email, phone, riskScore }) {
  const endpoint = "https://4yzbmtzb6a.execute-api.us-west-2.amazonaws.com/register";
  const payload = {};
  if (email) payload.email = email;
  if (phone) payload.phone = phone;
  if (riskScore !== undefined) payload.riskScore = riskScore;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  console.log("[NotificationAPI] Sending request:", { endpoint, payload, options });
  try {
    const response = await fetch(endpoint, options);
    console.log("[NotificationAPI] Response status:", response.status, response.statusText);
    let responseBody;
    try {
      responseBody = await response.clone().json();
      console.log("[NotificationAPI] Response body:", responseBody);
    } catch (jsonErr) {
      responseBody = await response.clone().text();
      console.log("[NotificationAPI] Non-JSON response body:", responseBody);
    }
    if (!response.ok) {
      throw new Error((responseBody && responseBody.message) || `Error: ${response.status}`);
    }
    return responseBody;
  } catch (err) {
    console.error("[NotificationAPI] Fetch error:", err);
    throw err;
  }
}

