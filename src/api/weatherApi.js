import * as axios from "axios";

/**
 * To get access to current weather, minute forecast for 1 hour, hourly forecast for 48 hours, daily forecast for 7 days
 * @param lat
 * @param lon
 * @returns {Promise<*>}
 */
export default async function fetchWeatherApi({ lat, lon }) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.VUE_APP_API_KEY}`
  );
  return response.data;
}
