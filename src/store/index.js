import { createStore } from "vuex";
import fetchWeather from "@/api/weatherApi";

export default createStore({
  state: {
    weatherList: new Map(),
    selectedCityWeather: null
  },
  mutations: {
    ADD_WEATHER(state, payload) {
      state.weatherList.set(payload.key, payload.value);
    },
    SET_SELECTED_CITY_WEATHER(state, payload) {
      state.selectedCityWeather = payload;
    }
  },
  actions: {
    async fetchWeather({ state, commit }, payload) {
      if (!state.weatherList.has(payload.name)) {
        const response = await fetchWeather(payload.coord);
        commit("ADD_WEATHER", { key: payload.name, value: response });
        return response;
      } else {
        return state.weatherList.get(payload.name);
      }
    },
    async setSelectedCityWeather({ commit }, payload) {
      commit("SET_SELECTED_CITY_WEATHER", payload);
    }
  },
  modules: {}
});
