import { WEATHER_ICON_MAP, WEEKDAY_MAP } from "@/utils/constants";

/**
 * Get Day of week based on index {0=Sun}
 * @param index
 * @returns {string}
 */
export function getDayOfWeek(index) {
  return WEEKDAY_MAP[index] || "";
}

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
  return WEATHER_ICON_MAP[iconId] || _getOpenWeatherIcon(iconId);
}
