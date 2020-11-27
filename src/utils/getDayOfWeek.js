const weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

/**
 * Get Day of week based on index {0=Sun}
 * @param index
 * @returns {string}
 */
export default function getDayOfWeek(index) {
  return weekday[index] || "";
}
