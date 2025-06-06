// Utility for fetching AQI and weather forecast data from OpenWeatherMap
// Returns: { aqiData, weatherForecast } both as arrays

import { SLC_CITY, SLC_COORDS } from './constants';

export async function fetchAqiAndWeather(cityOrCoords = SLC_CITY, apiKey) {
  if (!apiKey) {
    // Fallback sample data
    return {
      aqiData: [
        { aqi: 2, label: "Mon", date: new Date() },
        { aqi: 3, label: "Tue", date: new Date() },
        { aqi: 4, label: "Wed", date: new Date() },
        { aqi: 3, label: "Thu", date: new Date() },
        { aqi: 2, label: "Fri", date: new Date() },
        { aqi: 1, label: "Sat", date: new Date() },
        { aqi: 2, label: "Sun", date: new Date() },
        { aqi: 3, label: "Mon", date: new Date() },
        { aqi: 4, label: "Tue", date: new Date() },
        { aqi: 5, label: "Wed", date: new Date() }
      ],
      weatherForecast: [
        { label: "Mon", temp: 22, icon: "cloud", description: "partly cloudy" },
        { label: "Tue", temp: 25, icon: "sun", description: "sunny" },
        { label: "Wed", temp: 21, icon: "cloud", description: "cloudy" },
        { label: "Thu", temp: 19, icon: "cloud-showers-heavy", description: "rain" },
        { label: "Fri", temp: 23, icon: "sun", description: "sunny" }
      ]
    };
  }

  let lat, lon;
  let weatherData;

  // If cityOrCoords is an object with lat/lng|lon, use coordinates directly
  if (typeof cityOrCoords === 'object' && cityOrCoords !== null && 'lat' in cityOrCoords && ('lon' in cityOrCoords || 'lng' in cityOrCoords)) {
    lat = cityOrCoords.lat;
    lon = cityOrCoords.lon !== undefined ? cityOrCoords.lon : cityOrCoords.lng;
    // Fetch weather data by coordinates
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data");
    weatherData = await weatherRes.json();
  } else {
    // Fallback to city string
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityOrCoords)}&appid=${apiKey}`;
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data");
    weatherData = await weatherRes.json();
    lat = weatherData.coord.lat;
    lon = weatherData.coord.lon;
  }

  // AQI forecast
  const aqiForecastUrl = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  // Weather 5-day/3-hour forecast
  const weatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  const [aqiRes, forecastRes] = await Promise.all([
    fetch(aqiForecastUrl),
    fetch(weatherForecastUrl)
  ]);
  if (!aqiRes.ok) throw new Error("Failed to fetch AQI forecast data");
  if (!forecastRes.ok) throw new Error("Failed to fetch weather forecast data");
  const aqiForecastData = await aqiRes.json();
  const weatherForecastData = await forecastRes.json();

  // AQI grouping by day, max per day
  const aqiForecast = aqiForecastData.list.map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      aqi: item.main.aqi,
      label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      date,
    };
  });
  // Only take the first 10 days (one per day)
  const aqiData = aqiForecast.filter((item, idx, arr) =>
    arr.findIndex(d => d.label === item.label) === idx
  ).slice(0, 10);

  // Weather forecast grouping (closest to noon each day)
  const weatherByDay = {};
  weatherForecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString();
    const hour = date.getHours();
    if (!weatherByDay[dayKey] || Math.abs(hour - 12) < Math.abs(weatherByDay[dayKey].hour - 12)) {
      weatherByDay[dayKey] = {
        label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        temp: Math.round(item.main.temp),
        icon: getWeatherIcon(item.weather[0].main),
        description: item.weather[0].description,
        hour
      };
    }
  });
  const weatherForecast = Object.values(weatherByDay).slice(0, 10);
  return { aqiData, weatherForecast };
}

// Helper to map OWM weather main to FontAwesome icon
export function getWeatherIcon(main) {
  switch(main) {
    case 'Clear': return 'sun';
    case 'Clouds': return 'cloud';
    case 'Rain': return 'cloud-showers-heavy';
    case 'Drizzle': return 'cloud-rain';
    case 'Thunderstorm': return 'bolt';
    case 'Snow': return 'snowflake';
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado': return 'smog';
    default: return 'cloud';
  }
}
