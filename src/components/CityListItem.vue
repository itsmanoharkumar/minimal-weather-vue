<template>
  <div class="city-list">
    <div v-html="getCityName"></div>
    <div class="weather-info--container" v-if="weatherDetail">
      <div class="weather-info--text">
        <span class="weather-info--temp">{{ temperature }}</span>
        <span class="weather-info--day-type">{{ weatherTitle }}</span>
      </div>
      <img class="weather-info--image" :src="weatherIcon" />
    </div>
  </div>
</template>
<script>
import { getWeatherIcon } from "@/utils/utils";

export default {
  name: "CityListItem",
  props: {
    city: {},
    queryText: {},
    weatherList: {}
  },
  computed: {
    weatherIcon() {
      return getWeatherIcon(this.weatherDetail?.weather[0].icon);
    },
    temperature() {
      let temp = (this.weatherDetail && this.weatherDetail?.temp) || "";
      return `${Math.floor(temp)}° C`;
    },
    weatherTitle() {
      return (this.weatherDetail && this.weatherDetail?.weather[0].main) || "";
    },
    getCityName() {
      return `<span class="bold capitalize">${this.queryText.toLowerCase()}</span>${this.city.name.slice(
        this.queryText.length
      )}`;
    },
    weatherDetail() {
      let weatherDetails = this.weatherList?.get(this.city?.name);
      return weatherDetails?.current;
    }
  },
  mounted() {
    try {
      this.$emit("fetch-weather", this.city);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<style scoped lang="scss">
.weather-info {
  &--container {
    display: flex;
  }
  &--text {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  &--temp {
    font-weight: 900;
  }
  &--day-type {
    font-size: 0.8em;
    text-align: center;
    font-weight: 600;
    color: #7f7f80;
  }
  &--image {
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }
}
.city-list {
  cursor: pointer;
  text-align: left;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  min-height: 73px;
  &:not(:last-child) {
    border-bottom: 1px solid #c5c5c6;
  }
  &--container {
    width: 100%;
    position: absolute;
    top: 0;
    margin-top: 60px;
    border-radius: 12px;
    transition: box-shadow 0.2s ease-in-out;
    font-size: 1.2em;
    color: #040405;
    box-shadow: 0 12px 12px 4px #e7e7e8;
    background: white;
    max-height: 400px;
    overflow: scroll;
    z-index: 10000;
  }
}
</style>
