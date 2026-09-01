import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "fe4feefa8543e06d4f3c66d92c61b69c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// In-memory cache with 10-minute TTL
const cache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

const getCached = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

const setCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

/**
 * Fetch current weather and 5-day forecast by city name
 */
export const fetchWeatherData = async (city, unit = "metric") => {
  const cacheKey = `city_${city.toLowerCase().trim()}_${unit}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: { q: city.trim(), appid: API_KEY, units: unit },
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: { q: city.trim(), appid: API_KEY, units: unit },
      }),
    ]);

    const result = {
      current: currentRes.data,
      forecast: forecastRes.data,
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling.`);
    } else if (error.response && error.response.status === 401) {
      throw new Error("Invalid API key. Please check your OpenWeatherMap key.");
    } else {
      throw new Error(error.message || "Failed to fetch weather data.");
    }
  }
};

/**
 * Fetch current weather and 5-day forecast by geographic coordinates
 */
export const fetchWeatherByCoords = async (lat, lon, unit = "metric") => {
  const cacheKey = `coords_${lat.toFixed(2)}_${lon.toFixed(2)}_${unit}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: { lat, lon, appid: API_KEY, units: unit },
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: { lat, lon, appid: API_KEY, units: unit },
      }),
    ]);

    const result = {
      current: currentRes.data,
      forecast: forecastRes.data,
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch weather for your location.");
  }
};

/**
 * Group 3-hour forecast intervals into daily forecasts
 */
export const processDailyForecast = (forecastList = []) => {
  const daysMap = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    if (!daysMap[dayKey]) {
      daysMap[dayKey] = {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: dayKey,
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        icons: [item.weather[0].icon],
        descriptions: [item.weather[0].description],
        pop: item.pop || 0, // Probability of precipitation
        items: [item],
      };
    } else {
      daysMap[dayKey].minTemp = Math.min(daysMap[dayKey].minTemp, item.main.temp_min);
      daysMap[dayKey].maxTemp = Math.max(daysMap[dayKey].maxTemp, item.main.temp_max);
      daysMap[dayKey].icons.push(item.weather[0].icon);
      daysMap[dayKey].descriptions.push(item.weather[0].description);
      daysMap[dayKey].pop = Math.max(daysMap[dayKey].pop, item.pop || 0);
      daysMap[dayKey].items.push(item);
    }
  });

  return Object.values(daysMap).slice(0, 5);
};
