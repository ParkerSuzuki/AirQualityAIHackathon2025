import { CITY_TO_CSV } from "./csvMappingConstants";

// Helper to fetch and parse a city's AQI forecast from its CSV file
// Returns an array of { aqi, label, date } for the next 10 days
export async function getCityAqiForecast(city) {
  const csvFile = CITY_TO_CSV[city];
  if (!csvFile) throw new Error(`No CSV mapping for city: ${city}`);
  const response = await fetch(`/data/${csvFile}`);
  if (!response.ok) throw new Error(`Could not fetch AQI CSV for ${city}`);
  const text = await response.text();
  console.log('[cityCsvAqiUtil] Raw CSV text:', text);
  // Parse CSV with columns: date,AQI,predicted_next_day_AQI,alert
  const lines = text.trim().split(/\r?\n/);
  console.log('[cityCsvAqiUtil] Split lines:', lines);
  const header = lines[0].split(",").map(h => h.trim());
  console.log('[cityCsvAqiUtil] Header:', header);
  const dateIdx = header.indexOf("date");
  const predAqiIdx = header.indexOf("predicted_next_day_AQI");
  const alertIdx = header.indexOf("alert");

  const parsed = [];
  for (let i = 1; i < lines.length && parsed.length < 10; i++) {
    if (!lines[i].trim()) continue; // skip empty lines
    const cols = lines[i].split(",").map(v => v.trim());
    console.log(`[cityCsvAqiUtil] Row ${i} cols:`, cols);
    const dateStr = cols[dateIdx];
    const aqiStr = cols[predAqiIdx];
    const alert = cols[alertIdx];
    if (!dateStr || !aqiStr) {
      console.log(`[cityCsvAqiUtil] Row ${i} skipped: missing date or AQI`, { dateStr, aqiStr });
      continue;
    }
    const date = new Date(dateStr);
    const aqi = parseFloat(aqiStr);
    if (isNaN(date.getTime()) || isNaN(aqi)) {
      console.log(`[cityCsvAqiUtil] Row ${i} skipped: invalid date or AQI`, { dateStr, aqiStr });
      continue;
    }
    const parsedRow = {
      aqi,
      label: parsed.length === 0 ? "Today" : date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      date,
      alert
    };
    console.log(`[cityCsvAqiUtil] Row ${i} parsed:`, parsedRow);
    parsed.push(parsedRow);
  }
  console.log('[cityCsvAqiUtil] Final parsed array:', parsed);
  return parsed;
}
