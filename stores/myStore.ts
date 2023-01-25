import { defineStore } from 'pinia'
import * as Papa from "papaparse";
import * as echarts from "echarts";

const urlFile = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA78A9MBaU91UUC0kJRpUo5UD255nAdXncMNHAWfnVYljfY4qv8nElTIe6KDjdUzX1iwJeHMyc3TYl/pub?gid=2069355443&single=true&output=csv"

export const useImportStore = defineStore('ImportStore', {
    
    state: () => {
        return {
            imported: false,
            colnames: [],
            dataTable: [],
            dataSeries: [],
            legend: [],
            indicator: []
        };
    },
    getters: {},
    actions: {
        async import() {
            if (!this.imported) {
                var data = Papa.parse(urlFile, {
                    download: true,
                    header: true, 
                    complete: (results) => {
                        let data = results.data;
                        var dataSeries = [];
                        for (var element of Object.keys(data[0]).slice(2)) {
                            var temp = {};
                            temp["name"] = element;
                            temp["max"] = 5;
                            this.indicator.push(temp);
                            this.colnames.push(element);
                        }
                        var dataSeries = [];
                        for (var element of data) {
                            var e = Object.values(element)
                            var temp = {};
                            temp["value"] = e.slice(2);
                            temp["name"] = e[1];
                            this.legend.push(e[1]);
                            this.dataTable.push(e.slice(2));
                            this.dataSeries.push(temp);
                        }
                        
                    },
                });
                this.imported = true;
            }
        }, 
        createChart(divName) {
            // Initialize the echarts instance based on the prepared dom
            var myChart = echarts.init(document.getElementById(divName));
      
            // Specify the configuration items and data for the chart
            var option = {
              legend: {
                data: this.legend,
              },
              radar: {
                // shape: 'circle',
                indicator: this.indicator,
              },
              series: [
                {
                  name: "Evaluation",
                  type: "radar",
                  tooltip: {
                    trigger: "item",
                  },
                  areaStyle: {},
                  data: this.dataSeries,
                },
              ],
            };
      
            // Display the chart using the configuration items and data just specified.
            myChart.setOption(option);
          },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useImportStore, import.meta.hot));
}
