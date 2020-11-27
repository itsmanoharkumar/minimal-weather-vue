const weatherIconMap = {
  "01d": require("@/assets/icons/sun.svg"),
  "02d": require("@/assets/icons/fewCloud.svg"),
  "03d": require("@/assets/icons/clouds.svg"),
  "04d": require("@/assets/icons/brokenCloud.svg"),
  "10d": require("@/assets/icons/rainy.svg"),
  "11d": require("@/assets/icons/thunder.svg")
};
export function getOpenWeatherIcon(iconId) {
  return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
}

export function getWeatherIcon(iconId) {
  const iconUrl = weatherIconMap[iconId];
  if (iconUrl) {
    return iconUrl;
  } else {
    return getOpenWeatherIcon(iconId);
  }
}
