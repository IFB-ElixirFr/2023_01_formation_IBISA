import { defineStore } from 'pinia'
import * as Papa from "papaparse";
import * as echarts from "echarts";

const urlFileFormulaire = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA78A9MBaU91UUC0kJRpUo5UD255nAdXncMNHAWfnVYljfY4qv8nElTIe6KDjdUzX1iwJeHMyc3TYl/pub?gid=2069355443&single=true&output=csv"
const urlFileStats = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA78A9MBaU91UUC0kJRpUo5UD255nAdXncMNHAWfnVYljfY4qv8nElTIe6KDjdUzX1iwJeHMyc3TYl/pub?gid=1000434945&single=true&output=csv"

const urlFileSecurityResponse = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNS8ibfHWWkfIA5MyJs6tlyK48iustx2rzLjQhhvWqcwUn1rBGOLs_w9a9sZaJnz3Yefo_Wx5oG2wy/pub?gid=1944821903&single=true&output=csv"
const urlFileSecurityStats = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNS8ibfHWWkfIA5MyJs6tlyK48iustx2rzLjQhhvWqcwUn1rBGOLs_w9a9sZaJnz3Yefo_Wx5oG2wy/pub?gid=1150317142&single=true&output=csv"

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
            xnames: [],
            dataSecurity: [],
            dataMaturity: [],
            dataType: {},
            dataComputedSecurity: [],
            nameUserSecurity: [],
            dataStatsSecurity: [],
            dataStatsMaturity: [],
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

                Papa.parse(urlFileSecurityResponse, {
                    download: true,
                    complete: (results) => {
                        for (let i = 1; i < results.data.length; i++) {

                            var tempSS = Math.max(...results.data[i].slice(2, 5).map(Number)) + Math.max(...results.data[i].slice(5, 8).map(Number)) + Math.max(...results.data[i].slice(8, 13).map(Number)) + Math.max(...results.data[i].slice(13, 17).map(Number));
                            if (tempSS <= 6) {
                                var iss = '1- Faible'
                            } else if (tempSS <= 9) {
                                var iss = '2- Moyen'
                            } else if (tempSS <= 16) {
                                var iss = '3- Fort'
                            }

                            var SSM = results.data[i].slice(17, 29).map(Number).reduce((a, b) => a + b, 0)

                            if (SSM <= 10) {
                                var BSSM = {
                                    'Niveau': '1- Pratique informelle',
                                    'Description': "Pratiques de base mises en oeuvre de mani??re informelle et r??active sur l'initiative de ceux qui estiment en avoir besoin",
                                    'Bilan': '??l??mentaire'
                                }
                            } else if (SSM <= 15) {
                                var BSSM = {
                                    'Niveau': '2 - Pratique r??p??table et suivie',
                                    'Description': "Pratiques de base mises en oeuvre de fa??on planifi??e et suivie, avec un support relatif de l'organisme",
                                    'Bilan': '??l??mentaire'
                                }
                            } else if (SSM <= 40) {
                                var BSSM = {
                                    'Niveau': '3 - Processus d??finis',
                                    'Description': "Mise en oeuvre d'un processus d??crit, adapt?? ?? l'organisme, g??n??ralis?? et bien compris par le management et par les ex??cutants",
                                    'Bilan': 'moyen'
                                }
                            } else if (SSM <= 50) {
                                var BSSM = {
                                    'Niveau': '4 - Processus contr??l??s',
                                    'Description': "Le processus est coordonn?? et contr??l?? ?? l'aide d'indicateurs permettant de corriger les d??fauts constat??s",
                                    'Bilan': 'avanc??'
                                }
                            } else if (SSM <= 60) {
                                var BSSM = {
                                    'Niveau': '5 - Processus continuellement optimis??',
                                    'Description': "L'am??lioration des processus est dynamique, institutionnalis??e et tient compte de l'??volution du contexte",
                                    'Bilan': 'avanc??'
                                }
                            }

                            if (tempSS <= 6 && SSM <= 25) {
                                var typeDemarche = 'Pianissimo??: d??marche autonome a minima'
                            } else if (tempSS > 6 && tempSS < 10 && SSM <= 25) {
                                var typeDemarche = 'Mezzo-Forte??: d??marche assist??e approfondie'
                            } else if (tempSS > 9 && SSM <= 25) {
                                var typeDemarche = 'Mezzo-Forte??: d??marche assist??e approfondie'
                            } else if (tempSS <= 6 && SSM > 25 && SSM <= 40) {
                                var typeDemarche = 'Pianissimo??: d??marche autonome a minima'
                            } else if (tempSS > 6 && tempSS < 10 && SSM > 25 && SSM <= 40) {
                                var typeDemarche = 'Mezzo-Forte??: d??marche assist??e approfondie'
                            } else if (tempSS > 9 && SSM > 25 && SSM <= 40) {
                                var typeDemarche = 'Mezzo-Forte??: d??marche assist??e approfondie'
                            } else if (tempSS <= 6 && SSM > 40) {
                                var typeDemarche = 'Pianissimo??: d??marche autonome a minima'
                            } else if (tempSS > 6 && tempSS < 10 && SSM > 40) {
                                var typeDemarche = 'Forte??: hors champ de ce guide'
                            } else if (tempSS > 9 && SSM > 40) {
                                var typeDemarche = 'Forte??: hors champ de ce guide'
                            }


                            this.dataComputedSecurity.push({
                                'name': results.data[i][1],
                                'ScoreSecurity': tempSS,
                                'interpretationScoreSecurity': iss,
                                'ScoreMaturity': SSM,
                                'interpretationScoreMaturity': BSSM,
                                'typeDemarche': typeDemarche
                            })

                            this.nameUserSecurity.push(results.data[i][1])
                            this.dataSecurity = useSorted(this.dataComputedSecurity, (a, b) => a.ScoreSecurity - b.ScoreSecurity)
                            this.dataMaturity = useSorted(this.dataComputedSecurity, (a, b) => a.ScoreMaturity - b.ScoreMaturity)

                            this.dataType = {
                                "Pianissimo : d??marche autonome a minima": [],
                                "Mezzo-Forte : d??marche assist??e approfondie": [],
                                "Forte : hors champ de ce guide": []
                            }
                            for (var temp of this.dataComputedSecurity) {

                                if (temp.typeDemarche.startsWith('Pianissimo')) {
                                    this.dataType["Pianissimo : d??marche autonome a minima"].push(temp.name + " (S??curit?? :" + temp.ScoreSecurity + ", Maturit?? SSi : " + temp.ScoreMaturity + ")")
                                } else if (temp.typeDemarche.startsWith('Mezzo')) {
                                    this.dataType["Mezzo-Forte : d??marche assist??e approfondie"].push(temp.name + " (S??curit?? : " + temp.ScoreSecurity + ", Maturit?? SSi : " + temp.ScoreMaturity + ")")
                                } else if (temp.typeDemarche.startsWith('Forte')) {
                                    this.dataType["Forte : hors champ de ce guide"].push(temp.name + " (S??curit?? : " + temp.ScoreSecurity + ", Maturit?? SSi : " + temp.ScoreMaturity + ")")
                                }
                            }
                        }
                    },
                });

                Papa.parse(urlFileSecurityStats, {
                    download: true,
                    header: true,
                    complete: (results) => {
                        this.dataStatsSecurity = results.data.slice(0, 15)
                        this.dataStatsMaturity = results.data.slice(15, )
                        
                        this.dataStatsSecurity = useSorted(this.dataStatsSecurity, (a, b) => parseFloat(a.score.replaceAll(",", ".")) - parseFloat(b.score.replaceAll(",", ".")))
                        this.dataStatsMaturity = useSorted(this.dataStatsMaturity, (a, b) => parseFloat(a.score.replaceAll(",", ".")) - parseFloat(b.score.replaceAll(",", ".")))
                    }
                })

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
                        text: 'Boxplot des r??sultats'
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
