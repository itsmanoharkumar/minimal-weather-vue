import * as axios from "axios";

export default async function fetchWeather({ lat, lon }) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.VUE_APP_API_KEY}`
  );
  return response.data;
}
