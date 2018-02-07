<template>
    <div class="trendAnalysis-container">
        <div ref="chart1" class="chart chart1"></div>
        <div ref="chart2" class="chart chart2"></div>
        <div class="chart-title chart-title1">舆论话题分布</div>
        <div class="chart-title chart-title2">整体舆情走势</div>
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
                    color: ['#8e81bc','#88c897','#ef857d','#65aadd'],
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
                        x : 'center',
                        y : 'bottom',
                        data:['全部','正面','负面', '中立']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 40,
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
                    color: ['#8e81bc','#88c897','#ef857d','#65aadd'],
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
                        x : 'center',
                        y : 'bottom',
                        data:['全部','正面','负面', '中立']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 40,
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
        position: relative;
        width: 100%;
        height: 100%;

        .chart {
            width: 100%;
            height: 361px;
            border: 1px solid #c8dcf2;
            background-color: #F7F7F7;
            &.chart2 {
                margin-top: 8px;
            }
        }

        .chart-title {
            position: absolute;
            padding-left: 6px;
            height: 18px;
            font-size: 16px;
            line-height: 18px;
            border-left: 6px solid #3071b8;
            overflow: hidden;
            z-index: 1;

            &.chart-title1 {
                top: 6px;
                left: 18px;
            }
            &.chart-title2 {
                top: 375px;
                left: 18px;
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">

</style>