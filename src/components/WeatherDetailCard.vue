<template>
  <div class="weather-detail--card">
    <div class="weather-detail--temp-container">
      <span class="weather-detail--temp">
        {{ temperature }}
      </span>
      <img class="weather-detail--icon" :src="weatherIcon" />
    </div>
    <WeatherGraph
      :weather-detail="weatherDetail"
      :hourly-detail="hourlyDetail"
    ></WeatherGraph>
    <div class="weather-detail--other-container">
      <div class="weather-detail--other-item">
        <div class="weather-detail--other-heading">Pressure</div>
        <div>{{ pressure }} hpa</div>
      </div>
      <div class="weather-detail--other-item">
        <div class="weather-detail--other-heading">Humidity</div>
        <div>{{ humidity }} %</div>
      </div>
    </div>
    <div class="weather-detail--timing-section">
      <div class="weather-detail--timing-sunrise">
        <div class="weather-detail--timing-heading">Sunrise</div>
        <div>{{ sunrise }}am</div>
      </div>
      <div class="weather-detail--timing-sunset">
        <div class="weather-detail--timing-heading">Sunset</div>
        <div>{{ sunset }}pm</div>
      </div>
      <TimingGraph :weather-detail="weatherDetail"></TimingGraph>
    </div>
  </div>
</template>

<script>
import { getWeatherIcon } from "@/utils/utils";
import WeatherGraph from "@/components/WeatherGraph";
import TimingGraph from "@/components/TimingGraph";

export default {
  name: "WeatherDetailCard",
  components: { TimingGraph, WeatherGraph },
  computed: {
    temperature() {
      let temp = this.weatherDetail?.temp;
      if (typeof temp !== "number") {
        temp = this.weatherDetail?.temp?.max;
      }
      return temp ? Math.floor(temp) + "°C" : "";
    },
    weatherIcon() {
      return getWeatherIcon(this.weatherDetail?.weather[0]?.icon);
    },
    pressure() {
      return this.weatherDetail?.pressure;
    },
    humidity() {
      return this.weatherDetail?.humidity;
    },
    sunrise() {
      let time = this.weatherDetail?.sunrise;
      time = new Date(time * 1000);
      time = time.getHours() + ":" + time.getMinutes();
      return time;
    },
    sunset() {
      let time = this.weatherDetail?.sunset;
      time = new Date(time * 1000);
      time = time.getHours() - 12 + ":" + time.getMinutes();
      return time;
    }
  },
  props: {
    weatherDetail: { type: Object, default: null, required: false },
    hourlyDetail: { type: Array, default: null, required: false }
  }
};
</script>

<style scoped lang="scss">
.weather-detail {
  &--card {
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 0 12px 4px #e7e7e8;
    width: 100%;
    background-color: white;
    text-align: left;
  }

  &--temp-container {
    display: flex;
    align-items: center;
  }

  &--temp {
    font-size: 4em;
    font-weight: 900;
  }

  &--icon {
    margin-left: 20px;
    width: 50px;
  }
  &--timing {
    &-heading {
      font-weight: 900;
      font-size: 1.2em;
      color: #040405;
    }
    &-section {
      width: 100%;
      position: relative;
      margin-top: 40px;
      padding-bottom: 40px;
      font-size: 1.2em;
      font-weight: 600;
      color: #69696a;
    }
    &-sunrise {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
    }
    &-sunset {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  &--other {
    &-container {
      display: flex;
    }
    &-item {
      flex-grow: 1;
      padding: 10px;
      background-color: #f5fafe;
      font-weight: 600;
      &:first-child {
        margin-right: 10px;
      }
    }
    &-heading {
      font-weight: 900;
      font-size: 1.2em;
      color: #040405;
    }
  }
}
</style>
