<template>
  <div class="search-box">
    <div class="search-box--input_wrapper">
      <img
        class="search-box--geo-icon"
        src="@/assets/icons/pin.svg"
        alt="geo"
      />
      <input
        placeholder="City"
        v-model.lazy.trim="queryText"
        type="text"
        class="search-box--input"
      />
      <img
        class="search-box--search-icon"
        src="@/assets/icons/search.svg"
        alt="search"
      />
      <div class="city-list--container" v-if="!hideCityList">
        <CityListItem
          v-for="city of filteredCityList"
          :key="city.id"
          :city="city"
          :query-text="queryText"
          :weather-list="weatherList"
          @fetch-weather="onFetchWeather"
          @click="onSelectCity(city)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CityListItem from "@/components/CityListItem";
const cityList = () => import("@/assets/resource/cityList.json");
export default {
  name: "SearchBox",
  components: { CityListItem },
  props: {
    weatherList: {},
    currentCity: { type: String, default: null, required: false }
  },
  data() {
    return {
      queryText: "",
      cityList: null,
      selectedCity: null,
      hideCityList: true
    };
  },
  async mounted() {
    let response = await cityList();
    this.cityList = response.default;
  },
  watch: {
    currentCity(val) {
      this.queryText = val;
    },
    filteredCityList(val) {
      if (this.currentCity !== this.queryText) {
        this.hideCityList = !(val && val.length > 0);
      }
    },
    currentWeather(val) {
      this.$emit("update-current-weather", val);
    }
  },
  computed: {
    filteredCityList() {
      if (
        !this.queryText ||
        this.queryText.length <= 1 ||
        this.queryText === "Current City"
      ) {
        return [];
      }
      return this.cityList?.filter(city => {
        return (
          city.name.toLowerCase().startsWith(this.queryText.toLowerCase()) ||
          city.name.localeCompare(this.queryText, "en", {
            sensitivity: "base"
          }) === 0
        );
      });
    },
    currentWeather() {
      return this.weatherList.get(this.selectedCity);
    }
  },
  methods: {
    onFetchWeather(payload) {
      this.$emit("fetch-weather", payload);
    },
    getCityName(city) {
      return `<span class="bold capitalize">${
        this.queryText
      }</span>${city.name.slice(this.queryText.length)}`;
    },
    onSelectCity(city) {
      this.queryText = city.name;
      this.$nextTick(() => {
        this.hideCityList = true;
        this.selectedCity = city.name;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.city-list--container {
  width: 100%;
  position: absolute;
  top: 0;
  margin-top: 60px;
  border-radius: 12px;
  transition: box-shadow 0.2s ease-in-out;
  transform: translate3d(0, 0, 0);
  font-size: 1.2em;
  color: #040405;
  box-shadow: 0 12px 12px 4px #e7e7e8;
  background: white;
  max-height: 400px;
  overflow: scroll;
}
.search-box {
  &--geo-icon,
  &--search-icon {
    width: 24px;
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
  &--geo-icon {
    left: 20px;
  }
  &--search-icon {
    right: 20px;
    width: 20px;
  }
  &--input {
    border-radius: 12px;
    border: none;
    display: block;
    height: 60px;
    padding: 10px 50px 10px 56px;
    font-weight: 500;
    text-transform: capitalize;
    width: 100%;
    box-shadow: 0 0 12px 4px #e7e7e8;
    outline: none;
    flex-grow: 1;
    transition: box-shadow 0.2s ease-in-out;
    font-size: 1.2em;
    color: #040405;
    &:focus {
      border: 1px solid #3fa9e8;
      box-shadow: 0 0 12px 8px #e7e7e8;
      outline: none;
    }
    &_wrapper {
      position: relative;
      display: flex;
      z-index: 10;
    }
  }
}
</style>
