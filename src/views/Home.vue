<template>
  <div class="home">
    <RippleLoader v-if="showLoader" class="home--loader"></RippleLoader>
    <SearchBox
      :weather-list="weatherList"
      :current-city="currentCity"
      @fetch-weather="onFetchWeather"
      @update-current-weather="onUpdateCurrentWeather"
    ></SearchBox>
    <WeatherDateList
      class="home-weather-date-list"
      v-if="selectedCityWeather"
      :current-weather="selectedCityWeather"
      :selected-date="selectedDate"
      @update-selected-date="onUpdateSelectedDate"
    ></WeatherDateList>
    <WeatherDetailCard
      v-if="selectedWeatherDetail"
      class="home-weather-detail-card"
      :weather-detail="selectedWeatherDetail"
      :hourly-detail="hourlyWeatherDetail"
    ></WeatherDetailCard>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import { mapActions, mapState } from "vuex";
import WeatherDateList from "@/components/WeatherDateList";
import WeatherDetailCard from "@/components/WeatherDetailCard";
import fetchLocation from "@/api/ipLookupApi";
import RippleLoader from "@/components/RippleLoader";
export default {
  name: "Home",
  components: {
    RippleLoader,
    WeatherDetailCard,
    WeatherDateList,
    SearchBox
  },
  data() {
    return {
      selectedDate: new Date().getDate(),
      currentLocation: null,
      currentCity: null,
      showLoader: null
    };
  },
  watch: {
    async currentLocation(val) {
      if (val) {
        this.currentCity = val?.city;
        const response = await this.fetchWeather({
          name: this.currentCity,
          coord: val
        });
        this.setSelectedCityWeather(response);
        this.showLoader = false;
      }
    }
  },
  computed: {
    ...mapState(["selectedCityWeather", "weatherList"]),
    selectedWeatherDetail() {
      let index = Math.abs((this.selectedDate - new Date().getDate()) % 7);
      return index === 0
        ? this.selectedCityWeather?.current
        : this.selectedCityWeather?.daily[index];
    },
    hourlyWeatherDetail() {
      let index = Math.abs((this.selectedDate - new Date().getDate()) % 7);
      return index === 0 || index === 1
        ? this.selectedCityWeather?.hourly
        : null;
    }
  },
  mounted() {
    this.showLoader = true;
    this.fetchLocation();
  },
  methods: {
    fetchIpLocation: async function() {
      let location = await fetchLocation();
      this.currentLocation = {
        city: location?.city,
        lat: location?.lat,
        lon: location?.lon
      };
    },
    fetchLocation() {
      let location;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.currentLocation = {
              city: "Current City",
              lat: position.coords.latitude,
              lon: position.coords.longitude
            };
          },
          error_message => {
            console.error(
              "An error has occurred while retrieving location",
              error_message
            );
            this.fetchIpLocation(location);
          }
        );
      } else {
        this.fetchIpLocation(location);
      }
    },
    onFetchWeather(payload) {
      this.fetchWeather(payload);
      this.showLoader = false;
    },
    onUpdateCurrentWeather(payload) {
      this.setSelectedCityWeather(payload);
    },
    onUpdateSelectedDate(payload) {
      this.selectedDate = payload;
    },
    ...mapActions({
      fetchWeather: "fetchWeather",
      setSelectedCityWeather: "setSelectedCityWeather"
    })
  }
};
</script>
<style scoped lang="scss">
.home {
  position: relative;
  min-height: 500px;
}
.home--loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, 50%, 0);
}
.home-weather-date-list {
  margin-top: 28px;
}
.home-weather-detail-card {
  margin-top: 10px;
}
</style>
