<template>
  <div class="weather-date-list--container mobile-scroll">
    <WeatherDateCard
      :weather-detail="weatherDetail"
      v-for="(weatherDetail, index) of dailyWeatherList"
      :key="weatherDetail.dt"
      :index="index"
      :selected-date="selectedDate"
      @update-selected-date="onUpdateSelectedDate"
    ></WeatherDateCard>
  </div>
</template>

<script>
import WeatherDateCard from "@/components/WeatherDateCard";
export default {
  name: "WeatherDateList",
  components: { WeatherDateCard },
  props: {
    currentWeather: {},
    selectedDate: {}
  },
  computed: {
    dailyWeatherList() {
      return this.currentWeather.daily;
    }
  },
  methods: {
    onUpdateSelectedDate(payload) {
      this.$emit("update-selected-date", payload);
    }
  }
};
</script>

<style scoped lang="scss">
.weather-date-list {
  &--container {
    display: flex;
  }
}
</style>
