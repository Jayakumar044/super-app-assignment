import apiClient from "./apiClient.js";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "demo";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city = "London") => {
  try {
    const { data } = await apiClient.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      country: data.sys.country,
    };
  } catch (err) {
    // Return mock data so the widget always renders
    return {
      temp: 24,
      feelsLike: 22,
      humidity: 65,
      pressure: 1013,
      windSpeed: 3.5,
      condition: "Clear",
      description: "clear sky",
      icon: "01d",
      city: "London",
      country: "GB",
      mock: true,
    };
  }
};
