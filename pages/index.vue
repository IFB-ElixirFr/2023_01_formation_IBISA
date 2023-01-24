<template>
  <div id="main" style="width: 100%; height: 90%"></div>
</template>

<script>
import * as Papa from "papaparse";
import * as echarts from "echarts";

export default {
  data() {
    return {
      dataTable: [],
      colHeaders: [],
      tab: "Radar",
      items: ["Radar", "Tab", "About"],
      urlFile:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA78A9MBaU91UUC0kJRpUo5UD255nAdXncMNHAWfnVYljfY4qv8nElTIe6KDjdUzX1iwJeHMyc3TYl/pub?gid=2069355443&single=true&output=csv",
    };
  },
  created() {
    var data = Papa.parse(this.urlFile, {
      download: true,
      complete: (results) => {
        let data = results.data;
        let indicator = [];
        let legend = [];

        var dataSeries = [];
        for (var element of data[0].slice(2)) {
          var temp = {};
          temp["name"] = element;
          temp["max"] = 5;
          indicator.push(temp);
          this.colHeaders.push(element);
        }
        var dataSeries = [];
        for (var element of data.slice(1)) {
          var temp = {};
          temp["value"] = element.slice(2);
          temp["name"] = element[1];
          legend.push(element[1]);
          this.dataTable.push(element.slice(2));
          dataSeries.push(temp);
        }

        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById("main"));

        // Specify the configuration items and data for the chart
        var option = {
          legend: {
            data: legend,
          },
          radar: {
            // shape: 'circle',
            indicator: indicator,
          },
          series: [
            {
              name: "Evaluation",
              type: "radar",
              tooltip: {
                trigger: "item",
              },
              areaStyle: {},
              data: dataSeries,
            },
          ],
        };

        // Display the chart using the configuration items and data just specified.
        myChart.setOption(option);
      },
    });
  },
};
</script>

<style>
</style>