<template>
  <div class="weather-graph--container">
    <div class="weather-graph--wrapper" :class="weatherWrapperClass">
      <canvas
        class="weather-graph--canvas"
        ref="weatherChartRef"
        width="1200"
        height="300"
      ></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "WeatherGraph",
  props: {
    weatherDetail: {},
    hourlyDetail: {}
  },
  data() {
    return {
      chart: null,
      weatherWrapperClass: "",
      ctx: null
    };
  },
  watch: {
    weatherDetail() {
      this.setLabelList();
      this.setDataSet();
    }
  },
  mounted() {
    this.ctx = this.$refs.weatherChartRef.getContext("2d");
    const gradientFill = this.ctx.createLinearGradient(
      this.$refs.weatherChartRef.width / 2,
      0,
      this.$refs.weatherChartRef.width / 2,
      this.$refs.weatherChartRef.height
    );
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.2)");
    gradientFill.addColorStop(1, "rgba(128, 182, 244, 0)");
    this.chart = new Chart(this.ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "°C",
            data: [],
            backgroundColor: gradientFill,
            fill: true,
            borderWidth: 2
          }
        ]
      },
      options: {
        elements: {
          line: {
            stepped: false,
            borderColor: "rgba(66,170,232,1)",
            backgroundColor: "rgba(66,170,232,0.1)"
          },
          point: {
            pointStyle: "circle",
            radius: 4,
            borderColor: "rgba(66,170,232,1)",
            backgroundColor: "rgb(255,255,255)"
          }
        },
        tooltips: {
          intersect: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ]
        }
      }
    });
    this.setLabelList();
    this.setDataSet();
  },
  methods: {
    setDataSet() {
      if (this.hourlyDetail) {
        let selectedDate = new Date(this.weatherDetail.dt * 1000).getDate();
        this.chart.data.datasets[0].data = [];
        this.hourlyDetail.forEach(item => {
          let date = new Date(item.dt * 1000);
          if (selectedDate === date.getDate()) {
            this.chart.data.datasets[0].data.push(item.temp);
          }
        });
      } else {
        let data = [];
        data.push(this.weatherDetail.temp["morn"]);
        data.push(this.weatherDetail.temp["day"]);
        data.push(this.weatherDetail.temp["eve"]);
        data.push(this.weatherDetail.temp["night"]);
        this.chart.data.datasets[0].data = data;
      }
      this.chart.update();
    },
    setLabelList() {
      this.weatherWrapperClass = "";
      if (this.hourlyDetail) {
        this.chart.data.labels = [];
        let selectedDate = new Date(this.weatherDetail.dt * 1000).getDate();
        this.hourlyDetail.forEach(item => {
          let date = new Date(item.dt * 1000);
          let label = date.getHours();
          if (label > 12) {
            label = label - 12 + "pm";
          } else {
            label = (label ? label : 12) + "am";
          }
          if (selectedDate === date.getDate()) {
            this.chart.data.labels.push(label);
          }
        });
        if (this.chart.data.labels.length > 12) {
          this.weatherWrapperClass = "weather-graph--hourly-wrapper";
        }
      } else {
        this.chart.data.labels = ["Morning", "Day", "Evening", "Night"];
      }
      this.chart.update();
    }
  }
};
</script>

<style scoped lang="scss">
.weather-graph {
  &--container {
    width: 100%;
    margin-bottom: 10px;
    overflow: scroll;
  }
  &--wrapper {
    position: relative;
    width: 100%;
  }
  &--hourly-wrapper {
    width: 1100px;
  }
  &--canvas {
    //width: 1000px;
  }
}
</style>
