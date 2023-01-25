<template>
  <div id="main" style="width: 100%; height: 90%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  setup() {
    const importStore = useImportStore();
    importStore.import();
    return { importStore };
  },
  data() {
    return {};
  },
  mounted() {
    this.createChart();
  },
  updated() {
    this.createChart();
  },
  methods: {
    createChart() {
      // Initialize the echarts instance based on the prepared dom
      var myChart = echarts.init(document.getElementById("main"));

      // Specify the configuration items and data for the chart
      var option = {
        legend: {
          data: this.importStore.legend,
        },
        radar: {
          // shape: 'circle',
          indicator: this.importStore.indicator,
        },
        series: [
          {
            name: "Evaluation",
            type: "radar",
            tooltip: {
              trigger: "item",
            },
            areaStyle: {},
            data: this.importStore.dataSeries,
          },
        ],
      };

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>