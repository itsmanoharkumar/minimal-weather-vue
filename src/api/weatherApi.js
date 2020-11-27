import * as axios from "axios";

// export default async function fetchWeather(cityName) {
//   const response = await axios.get(
//     `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&q=${cityName}&cnt=7&appid=9fc751719e16f8c2ba8aecda28bf3ded`
//   );
//   return response.data;
// }

export default async function fetchWeather({ lat, lon }) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=minutely&appid=939cad0dafade96a308ae4f6c8157605`
  );
  return response.data;
}
