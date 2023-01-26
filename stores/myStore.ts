import { defineStore } from 'pinia'
import * as Papa from "papaparse";
import * as echarts from "echarts";

const urlFileFormulaire = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA78A9MBaU91UUC0kJRpUo5UD255nAdXncMNHAWfnVYljfY4qv8nElTIe6KDjdUzX1iwJeHMyc3TYl/pub?gid=2069355443&single=true&output=csv"
const urlFileStats = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA78A9MBaU91UUC0kJRpUo5UD255nAdXncMNHAWfnVYljfY4qv8nElTIe6KDjdUzX1iwJeHMyc3TYl/pub?gid=1000434945&single=true&output=csv"

export const useImportStore = defineStore('ImportStore', {

    state: () => {
        return {
            imported: false,
            colnames: [],
            dataTable: [],
            dataSeries: [],
            dataDic: [],
            legend: [],
            indicator: [],
            stats: [],
            xnames: []
        };
    },
    getters: {},
    actions: {
        async import() {
            if (!this.imported) {
                Papa.parse(urlFileFormulaire, {
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
                            this.xnames.push(element.split("(")[0]);
                            this.colnames.push(
                                {
                                    'name': element,
                                    'label': element,
                                    'field': element,
                                    sortable: true
                                }
                            );
                        }

                        for (var element of data) {
                            var e = Object.values(element)
                            var temp = {};
                            temp["value"] = e.slice(2);
                            temp["name"] = e[1];
                            this.legend.push(e[1]);
                            this.dataTable.push(e.slice(2));
                            this.dataSeries.push(temp);
                            this.dataDic.push(element)
                        }

                    },
                });

                Papa.parse(urlFileStats, {
                    download: true,
                    header: true,
                    complete: (results) => {
                        console.log(results.data[0])
                        var temp = Object.entries(results.data[0])
                        for (var element of temp) {
                            this.stats.push({
                                'name': element[0],
                                'value': parseFloat(element[1].replaceAll(',', '.')).toFixed(1)
                            })
                        }

                        this.stats = useSorted(this.stats, (a, b) => a.value - b.value)
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
        createBarplot(divName) {

            if (this.dataTable.length !== 0) {
                var data = this.dataTable[0].map((_, colIndex) => this.dataTable.map(row => row[colIndex]));

                var chartDom = document.getElementById(divName);
                var myChart = echarts.init(chartDom);
                var option;
                var xnames = this.xnames;

                option = {
                    yAxis: {
                        type: 'category',
                        boundaryGap: true,
                        nameGap: 30,
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    dataset: [
                        {
                            source: data
                        },
                        {
                            transform: {
                                type: 'boxplot',
                                config: {
                                    itemNameFormatter: function (params) {
                                        return xnames[params.value];
                                    }
                                }
                            }
                        },
                        {
                            fromDatasetIndex: 1,
                            fromTransformResult: 1
                        }
                    ],
                    xAxis: {},
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    title: {
                        text: 'Boxplot des résultats'
                    },
                    grid: {
                        left: 200
                    },
                    series: [
                        {
                            name: 'boxplot',
                            type: 'boxplot',
                            datasetIndex: 1
                        },
                        {
                            name: 'outlier',
                            type: 'scatter',
                            datasetIndex: 2
                        }
                    ]
                };

                option && myChart.setOption(option);
            }
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useImportStore, import.meta.hot));
}
