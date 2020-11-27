<template>
  <div class="timing-graph--container">
    <div class="timing-graph--wrapper">
      <canvas
        class="timing-graph--canvas"
        ref="timingChartRef"
        width="1200"
        height="400"
      ></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "TimingGraph",
  props: {
    weatherDetail: {},
    hourlyDetail: {}
  },
  data() {
    return {
      chart: null,
      ctx: null
    };
  },
  watch: {
    weatherDetail() {
      this.setDataSet();
    }
  },
  mounted() {
    this.ctx = this.$refs.timingChartRef.getContext("2d");
    const gradientFill = this.ctx.createLinearGradient(
      this.$refs.timingChartRef.width / 2,
      0,
      this.$refs.timingChartRef.width / 2,
      this.$refs.timingChartRef.height
    );
    gradientFill.addColorStop(0, "#fdf0cd");
    gradientFill.addColorStop(0.6, "#fdf0cd00");
    // gradientFill.addColorStop(0.9, "rgba(102,102,103,0.1)");
    this.chart = new Chart(this.$refs.timingChartRef, {
      type: "line",
      data: {
        datasets: [
          {
            label: "",
            data: [],
            pointRadius: 1,
            backgroundColor: gradientFill,
            fill: true,
            borderWidth: 1
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        elements: {
          line: {
            tension: 0.2,
            stepped: false
          },
          point: {
            pointStyle: "circle",
            radius: 4
          }
        },
        tooltips: {
          enabled: false,
          intersect: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  hour: "hA"
                },
                distribution: "linear"
              },
              ticks: {
                display: true,
                source: "data"
              },
              gridLines: {
                display: true,
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: false,
                padding: 25
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
    this.setDataSet();
  },
  methods: {
    setDataSet() {
      let sunriseTime = new Date(this.weatherDetail?.sunrise * 1000);
      let sunsetTime = new Date(this.weatherDetail?.sunset * 1000);
      let currentTime = new Date();

      let data = [];
      let isToday = false;
      data.push({
        t: new Date().setHours(5),
        y: -4
      });
      let sunriseTimeTemp = new Date();
      sunriseTimeTemp.setHours(sunriseTime.getHours());
      sunriseTimeTemp.setMinutes(sunriseTime.getMinutes());
      data.push({
        t: sunriseTimeTemp,
        y: 0
      });
      if (currentTime <= sunsetTime && currentTime >= sunriseTime) {
        isToday = true;
        data.push({
          t: currentTime,
          y: 8
        });
      } else {
        data.push({
          t: new Date().setHours(12),
          y: 8
        });
      }
      let sunsetTimeTemp = new Date();
      sunsetTimeTemp.setHours(sunsetTime.getHours());
      sunsetTimeTemp.setMinutes(sunsetTime.getMinutes()),
        data.push({
          t: sunsetTimeTemp,
          y: 0
        });
      data.push({
        t: new Date().setHours(20),
        y: -4
      });
      if (isToday) {
        const sunImage = new Image();
        sunImage.width = 40;
        sunImage.height = 40;
        sunImage.src = require("@/assets/icons/sun.svg");
        this.chart.data.datasets[0].pointHoverRadius = [0, 0, 5, 0, 0];
        this.chart.data.datasets[0].pointRadius = [0, 0, 5, 0, 0];
        this.chart.data.datasets[0].pointHitRadius = [0, 0, 5, 0, 0];
        this.chart.data.datasets[0].pointStyle = ["", "", sunImage, "", ""];
      } else {
        this.chart.data.datasets[0].pointHoverRadius = [0, 0, 0, 0, 0];
        this.chart.data.datasets[0].pointRadius = [0, 0, 0, 0, 0];
        this.chart.data.datasets[0].pointHitRadius = [0, 0, 0, 0, 0];
        this.chart.data.datasets[0].pointStyle = ["", "", "", "", ""];
      }
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
};
</script>

<style scoped lang="scss">
.timing-graph {
  &--container {
    width: 100%;
    margin-bottom: 10px;
    overflow: scroll;
    padding-top: 50px;
  }
  &--wrapper {
    position: relative;
    width: 100%;
  }
}
</style>
