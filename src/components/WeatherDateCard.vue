<template>
  <div
    class="weather-date--card"
    :class="{ 'is-selected': isSelected }"
    @click="onClick"
  >
    <div class="weather-date--day">
      {{ day }}
    </div>
    <div class="weather-date--temp">
      <span class="bold">
        {{ max }}
      </span>
      {{ min }}
    </div>
    <img class="weather-date--icon" :src="iconUrl" />
    <div class="weather-date--text">
      {{ weatherText }}
    </div>
  </div>
</template>

<script>
import getDayOfWeek from "@/utils/getDayOfWeek";
import { getWeatherIcon } from "@/utils/utils";

export default {
  name: "WeatherDateCard",
  props: {
    weatherDetail: {},
    index: {},
    selectedDate: {}
  },
  computed: {
    isSelected() {
      return this.selectedDate === this.date;
    },
    min() {
      return " " + Math.floor(this.weatherDetail.temp.min) + "°";
    },
    max() {
      return Math.floor(this.weatherDetail.temp.max) + "°";
    },
    weatherText() {
      return this.weatherDetail.weather[0].main;
    },
    date() {
      let date = new Date();
      date.setDate(date.getDate() + this.index);
      return date.getDate();
    },
    day() {
      let date = new Date();
      date.setDate(date.getDate() + this.index);
      return getDayOfWeek(date.getDay());
      // let day = getDayOfWeek((date.getDay() + this.index) % 7);
      // return day.slice(0, 3);
    },
    iconUrl() {
      return getWeatherIcon(this.weatherDetail.weather[0].icon);
    }
  },
  methods: {
    onClick() {
      this.$emit("update-selected-date", this.date);
    }
  }
};
</script>

<style scoped lang="scss">
.weather-date {
  &--card {
    cursor: pointer;
    padding: 16px;
    min-width: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.125s ease-in-out;
    transform: translate3d(0, 0, 0);
    border: 2px solid rgba(63, 169, 232, 0);
    &.is-selected {
      border: 2px solid #3fa9e8;
      background-color: #fffdf5;
    }
  }
  &--day {
    font-weight: bold;
  }
  &--icon {
    width: auto;
    height: 40px;
  }
  &--text {
    font-weight: 400;
    color: #707071;
  }
}
</style>
