const weatherIconMap = {
  "01d": require("@/assets/icons/sun.svg"),
  "02d": require("@/assets/icons/fewCloud.svg"),
  "03d": require("@/assets/icons/clouds.svg"),
  "04d": require("@/assets/icons/brokenCloud.svg"),
  "10d": require("@/assets/icons/rainy.svg"),
  "11d": require("@/assets/icons/thunder.svg")
};

/**
 * Get icon from openWeatherApi
 * @param iconId
 * @returns {iconUrl}
 * @private
 */
export function _getOpenWeatherIcon(iconId) {
  return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
}

/**
 * Get weather icon based on openWeatherApi icon id
 * @param iconId
 * @returns {iconUrl}
 */
export function getWeatherIcon(iconId) {
  return weatherIconMap[iconId] || _getOpenWeatherIcon(iconId);
}
