<template>
    <div class="trendAnalysis-container">
        <div ref="chart1" class="chart chart1"></div>
        <div ref="chart2" class="chart chart2"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import MOMENT from 'moment';
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                myChart1: null,
                myChart2: null
            }
        },
        created() {
        },
        mounted() {
            this.setChart1();
            this.setChart2();
        },
        methods: {
            setChart1() {
                this.myChart1 = echarts.init(this.$refs.chart1);
                var option = {
//                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {},
                    legend: {
                        data:['全部','正面','负面', '中立']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['00', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'全部',
                            type:'line',
                            data:[100, 110, 120, 115, 87, 92, 101, 113, 254, 201, 198, 156, 110, 100, 100, 110, 120, 115, 87, 92, 101, 113, 254, 201]
                        },
                        {
                            name:'正面',
                            type:'line',
                            data:[80, 90, 100, 110, 50, 87, 77, 110, 204, 201, 148, 144, 110, 88, 80, 90, 100, 110, 50, 87, 77, 110, 204, 201]
                        },
                        {
                            name:'负面',
                            type:'line',
                            data:[4, 5, 6, 2, 0, 4, 3, 0, 12, 14, 9, 7, 7, 4, 4, 5, 6, 2, 0, 4, 3, 0, 12, 14]
                        },
                        {
                            name:'中立',
                            type:'line',
                            data:[16, 25, 14, 3, 37, 1, 8, 13, 3, 38, 26, 1, 5, 8, 16, 25, 14, 3, 37, 1, 8, 13, 3, 38]
                        }
                    ]
                };

                this.myChart1.setOption(option);
            },
            setChart2() {
                this.myChart1 = echarts.init(this.$refs.chart2);
                var option = {
//                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {},
                    legend: {
                        data:['全部','正面','负面', '中立']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'全部',
                            type:'line',
                            data:[100, 110, 120, 115, 87, 92, 101, 113, 254, 201, 198, 156, 110, 100]
                        },
                        {
                            name:'正面',
                            type:'line',
                            data:[80, 90, 100, 110, 50, 87, 77, 110, 204, 201, 148, 144, 110, 88]
                        },
                        {
                            name:'负面',
                            type:'line',
                            data:[4, 5, 6, 2, 0, 4, 3, 0, 12, 14, 9, 7, 7, 4]
                        },
                        {
                            name:'中立',
                            type:'line',
                            data:[16, 25, 14, 3, 37, 1, 8, 13, 3, 38, 26, 1, 5, 8]
                        }
                    ]
                };

                this.myChart1.setOption(option);
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .trendAnalysis-container {
        width: 100%;
        height: 100%;

        .chart {
            width: 100%;
            height: 350px;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">

</style>